import React, { useState, useEffect, lazy, Suspense } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MembersAreaSkeleton } from './components/MembersAreaSkeleton';
import { MemberUser, STORAGE_USER_KEY } from './types/auth';

// Lazy-load the heavy MembersArea module containing all 1,200+ 3D models and catalog tools
// This allows the initial Login Screen (Nome e Email) to load instantly (<50ms)
const MembersArea = lazy(() => import('./components/MembersArea'));

export default function App() {
  const [currentUser, setCurrentUser] = useState<MemberUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Background preload: while the user is typing their name and email on the login screen,
  // silently prefetch the heavy MembersArea chunk in the browser cache so login is instant!
  useEffect(() => {
    if (!currentUser) {
      const preload = () => {
        import('./components/MembersArea');
      };

      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        const handle = (window as any).requestIdleCallback(preload, { timeout: 1500 });
        return () => (window as any).cancelIdleCallback(handle);
      } else {
        const timer = setTimeout(preload, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [currentUser]);

  const handleLogin = (user: MemberUser) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(STORAGE_USER_KEY);
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Suspense fallback={<MembersAreaSkeleton />}>
      <MembersArea currentUser={currentUser} onLogout={handleLogout} />
    </Suspense>
  );
}

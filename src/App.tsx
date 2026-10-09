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
      // Clear legacy localStorage user so user is always presented with the Login Screen
      localStorage.removeItem(STORAGE_USER_KEY);
      // Active session in current browser tab
      const saved = sessionStorage.getItem(STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Background preload: while the user is viewing/typing on the login screen,
  // silently prefetch the heavy MembersArea chunk and high-priority WebP images into browser cache so login is instant!
  useEffect(() => {
    if (!currentUser) {
      const preload = () => {
        import('./components/MembersArea');
        // Pre-warm featured top WebP images into browser cache silently
        const keyImages = [
          '/product_checkout.webp',
          '/canecas-gamer/playstation.webp',
          '/canecas-gamer/mortal_kombat.webp',
          '/canecas-gamer/call_of_duty.webp',
          '/canecas-gamer/gta.webp',
          '/canecas-gamer/minecraft.webp',
          'https://lh3.googleusercontent.com/d/1oZGQMdlviAQ-rinamSPXqcjctkNlTgmt=s220-rw',
          'https://lh3.googleusercontent.com/d/1X120q3Z6e3BRYCYvI_XnnnKHhl7h0qop=s220-rw',
          'https://lh3.googleusercontent.com/d/1dukxEHlYOyOvwGJmsKoTr0lxtYXFWf5w=s220-rw',
          'https://lh3.googleusercontent.com/d/1i_tsKbThJfNOieRfeAty1wxcsAwOaRS_=s220-rw',
          '/estadios/corinthians.webp',
          '/estadios/flamengo.webp',
          '/canecas/corinthians.webp'
        ];
        keyImages.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      };

      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        const handle = (window as any).requestIdleCallback(preload, { timeout: 1200 });
        return () => (window as any).cancelIdleCallback(handle);
      } else {
        const timer = setTimeout(preload, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [currentUser]);

  const handleLogin = (user: MemberUser) => {
    try {
      sessionStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(user);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(STORAGE_USER_KEY);
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

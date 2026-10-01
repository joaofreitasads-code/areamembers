import React, { useEffect } from 'react';
import { Check, Copy, Heart, Download } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'favorite' | 'download' | 'copy';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const renderIcon = () => {
    switch (toast.type) {
      case 'copy':
        return <Copy className="w-4 h-4 text-white" />;
      case 'favorite':
        return <Heart className="w-4 h-4 text-white fill-white" />;
      case 'download':
        return <Download className="w-4 h-4 text-white" />;
      default:
        return <Check className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="pointer-events-auto flex items-center gap-3 p-3.5 bg-zinc-950/95 border border-zinc-700 rounded-xl shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
      <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
        {renderIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-white leading-tight">{toast.title}</p>
        {toast.description && (
          <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{toast.description}</p>
        )}
      </div>
    </div>
  );
};

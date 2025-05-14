"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "roast" | "info" | "success" | "error";
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  message,
  type = "roast",
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "roast":
        return "bg-red-500 text-black border-purple-500";
      case "info":
        return "bg-blue-500 text-white border-blue-700";
      case "success":
        return "bg-green-500 text-white border-green-700";
      case "error":
        return "bg-red-500 text-white border-red-700";
      default:
        return "bg-red-500 text-black border-purple-500";
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md p-4 rounded-lg shadow-lg border-2 ${getToastStyles()} animate-in slide-in-from-right-full duration-300 z-50`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-2">
          {type === "roast" && (
            <div className="font-bold text-black mb-1">🔥 ROASTED 🔥</div>
          )}
          <div className={type === "roast" ? "font-semibold italic" : ""}>
            {message}
          </div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="text-black/70 hover:text-black"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastMessage {
  id: string;
  message: string;
  type: "roast" | "info" | "success" | "error";
  duration?: number;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    message: string,
    type: "roast" | "info" | "success" | "error" = "roast",
    duration = 5000
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Expose the addToast function to the window for global access
  useEffect(() => {
    (window as any).addToast = addToast;
    return () => {
      delete (window as any).addToast;
    };
  }, []);

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
}

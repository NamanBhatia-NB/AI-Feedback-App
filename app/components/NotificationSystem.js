"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

// Create a context for notifications
const NotificationContext = createContext();

// Types of notifications
const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

// Provider component
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const addNotification = (type, message, duration = 5000) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message, duration }]);
  };

  // Remove a notification by id
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // Helper functions for different notification types
  const success = (message, duration) => addNotification(NOTIFICATION_TYPES.SUCCESS, message, duration);
  const error = (message, duration) => addNotification(NOTIFICATION_TYPES.ERROR, message, duration);
  const info = (message, duration) => addNotification(NOTIFICATION_TYPES.INFO, message, duration);
  const warning = (message, duration) => addNotification(NOTIFICATION_TYPES.WARNING, message, duration);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, success, error, info, warning }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

// Hook to use the notification context
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}

// Container component to display notifications
function NotificationContainer() {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

// Individual notification component
function Notification({ notification, onClose }) {
  const { id, type, message, duration } = notification;

  // Auto-close after duration
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Get icon and styles based on notification type
  const getTypeStyles = () => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          bgColor: "bg-green-100 dark:bg-green-900",
          textColor: "text-green-800 dark:text-green-200",
          borderColor: "border-green-500",
        };
      case NOTIFICATION_TYPES.ERROR:
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          bgColor: "bg-red-100 dark:bg-red-900",
          textColor: "text-red-800 dark:text-red-200",
          borderColor: "border-red-500",
        };
      case NOTIFICATION_TYPES.WARNING:
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          bgColor: "bg-yellow-100 dark:bg-yellow-900",
          textColor: "text-yellow-800 dark:text-yellow-200",
          borderColor: "border-yellow-500",
        };
      case NOTIFICATION_TYPES.INFO:
      default:
        return {
          icon: <Info className="h-5 w-5" />,
          bgColor: "bg-blue-100 dark:bg-blue-900",
          textColor: "text-blue-800 dark:text-blue-200",
          borderColor: "border-blue-500",
        };
    }
  };

  const { icon, bgColor, textColor, borderColor } = getTypeStyles();

  return (
    <div
      className={`flex items-start p-4 rounded-lg shadow-lg border-l-4 ${borderColor} ${bgColor} animate-fade-in`}
      role="alert"
    >
      <div className={`mr-3 ${textColor}`}>{icon}</div>
      <div className="flex-1">
        <p className={`text-sm ${textColor}`}>{message}</p>
      </div>
      <button
        onClick={onClose}
        className={`ml-3 ${textColor} hover:text-gray-900 dark:hover:text-gray-100`}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

export default NotificationProvider; 
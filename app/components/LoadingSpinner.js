import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = "medium", fullPage = false, text = "Loading..." }) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.medium;

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className={`${spinnerSize} animate-spin mx-auto text-blue-500 mb-4`} />
          {text && <p className="text-gray-600 dark:text-gray-300">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className={`${spinnerSize} animate-spin mx-auto text-blue-500 ${text ? 'mb-2' : ''}`} />
        {text && <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>}
      </div>
    </div>
  );
} 
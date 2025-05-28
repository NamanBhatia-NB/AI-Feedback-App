import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full">
            <AlertTriangle className="h-16 w-16 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
} 
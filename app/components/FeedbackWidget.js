"use client";

import { useState } from "react";
import { MessageSquare, Send, X, Sparkles, Loader2 } from "lucide-react";
import { useNotification } from "./NotificationSystem";

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const { success, error } = useNotification();

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      error("Please enter your feedback");
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would send the feedback to your API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      success("Thank you for your feedback!");
      setFeedback("");
      setIsOpen(false);
    } catch (err) {
      error("Failed to submit feedback. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={toggleWidget}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
        aria-label={isOpen ? "Close feedback form" : "Open feedback form"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Feedback form */}
      <div
        className={`fixed bottom-20 right-6 z-40 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-all duration-300 transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
            Quick Feedback
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Share your thoughts or suggestions..."
            rows={4}
          ></textarea>
          
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md flex items-center justify-center transition-colors duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
} 
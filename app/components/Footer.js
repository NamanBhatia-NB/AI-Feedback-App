import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Github, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">AI Feedback</span>
            </div>
            <p className="text-sm">
              Gain real-time insights from customer feedback to enhance your brand reputation.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-5 h-5 hover:text-blue-500 transition-colors duration-200" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-5 h-5 hover:text-blue-400 transition-colors duration-200" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 hover:text-blue-600 transition-colors duration-200" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-5 h-5 hover:text-pink-500 transition-colors duration-200" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5 hover:text-gray-800 dark:hover:text-white transition-colors duration-200" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="hover:text-blue-500 transition-colors duration-200">Dashboard</Link></li>
              <li><Link href="/feedback" className="hover:text-blue-500 transition-colors duration-200">Feedback Analysis</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-500 transition-colors duration-200">Pricing</Link></li>
              <li><Link href="/integrations" className="hover:text-blue-500 transition-colors duration-200">Integrations</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-blue-500 transition-colors duration-200">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 transition-colors duration-200">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-blue-500 transition-colors duration-200">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-blue-500 transition-colors duration-200">Blog</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-blue-500 transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-500 transition-colors duration-200">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-blue-500 transition-colors duration-200">Cookie Policy</Link></li>
              <li><Link href="/security" className="hover:text-blue-500 transition-colors duration-200">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} AI Feedback. All Rights Reserved.</p>
          <p className="mt-2">Made with ❤️ for better customer insights</p>
        </div>
      </div>
    </footer>
  );
}

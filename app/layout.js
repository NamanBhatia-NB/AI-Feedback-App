import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SessionWrapper } from "./components/SessionWrapper";
import NotificationProvider from "./components/NotificationSystem";
import FeedbackWidget from "./components/FeedbackWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Feedback Analyzer",
  description: "Gain real-time insights from customer feedback to enhance your brand reputation",
  keywords: "AI, feedback, sentiment analysis, customer insights, analytics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-900 text-white`}
      >
        <SessionWrapper>
          <NotificationProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FeedbackWidget />
          </NotificationProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}

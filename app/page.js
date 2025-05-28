import Link from "next/link";
import { BarChart2, MessageSquare, TrendingUp, Zap, Shield, Users, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">AI-Powered</span> Customer Feedback Analyzer
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-300">
                Transform customer feedback into actionable insights. Our AI analyzes sentiment, detects trends, and helps you make data-driven decisions to improve customer experience.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/feedback">
                  <button className="btn btn-primary px-8 py-3 rounded-lg text-lg flex items-center justify-center gap-2">
                    Get Started <ArrowRight size={18} />
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="px-8 py-3 rounded-lg text-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2">
                    View Demo <BarChart2 size={18} />
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">Sentiment Analysis</h3>
                      <span className="px-2 py-1 bg-green-900 text-green-200 rounded-full text-xs">Live Demo</span>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-300">"I love how easy it is to use this product. The interface is intuitive and the customer service is excellent!"</p>
                        <div className="mt-2 flex items-center">
                          <div className="h-2 w-full bg-gray-600 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-green-400">92%</span>
                        </div>
                        <p className="mt-1 text-xs text-right text-gray-400">Positive Sentiment</p>
                      </div>
                      <div className="p-3 bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-300">"The product is okay but the loading times could be improved. Sometimes it takes too long to process my requests."</p>
                        <div className="mt-2 flex items-center">
                          <div className="h-2 w-full bg-gray-600 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-500 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-300">45%</span>
                        </div>
                        <p className="mt-1 text-xs text-right text-gray-400">Neutral Sentiment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Our AI Tool?</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
              Our platform uses advanced machine learning algorithms to provide you with the most accurate and actionable insights.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="h-10 w-10 text-blue-500" />}
              title="Sentiment Analysis" 
              description="Classifies feedback as positive, neutral, or negative with high accuracy. Understand customer emotions at a glance." 
            />
            <FeatureCard 
              icon={<TrendingUp className="h-10 w-10 text-purple-500" />}
              title="Trend Detection" 
              description="Identifies emerging patterns and customer concerns before they become major issues. Stay ahead of the curve." 
            />
            <FeatureCard 
              icon={<Zap className="h-10 w-10 text-yellow-500" />}
              title="Actionable Insights" 
              description="Provides specific, data-driven recommendations to improve customer experience and boost satisfaction scores." 
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">How It Works</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
              Our simple three-step process transforms raw feedback into valuable business intelligence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              step="1" 
              title="Collect Feedback" 
              description="Gather customer reviews, surveys, and social media comments through our intuitive interface or API integrations." 
            />
            <StepCard 
              step="2" 
              title="AI Analysis" 
              description="Our advanced NLP models analyze sentiment, detect trends, and extract key topics from your feedback data." 
            />
            <StepCard 
              step="3" 
              title="Get Insights" 
              description="View real-time insights on an interactive dashboard with visualizations and actionable recommendations." 
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="98%" text="Customer Satisfaction" />
            <StatCard number="2.5x" text="ROI Improvement" />
            <StatCard number="65%" text="Faster Response" />
            <StatCard number="10k+" text="Active Users" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about our platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Testimonial
              name="Sarah Johnson"
              role="Customer Experience Manager"
              company="TechCorp Inc."
              image="/avatar1.jpg"
              feedback="This tool helped us understand our customers better. Our satisfaction rate increased by 20% within just three months of implementation!"
            />
            <Testimonial
              name="Michael Lee"
              role="Marketing Director"
              company="Global Retail"
              image="/avatar2.jpg"
              feedback="Real-time insights have transformed our business strategy. We can now respond to customer concerns before they become problems. Highly recommended!"
            />
          </div>
        </div>
      </section>

      {/* Call-To-Action */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Start Improving Customer Experience Today</h2>
          <p className="mt-4 text-lg text-gray-300">
            Join thousands of businesses that use our AI-powered platform to analyze feedback, detect trends, and gain valuable insights.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <button className="btn btn-primary px-8 py-3 rounded-lg text-lg flex items-center justify-center gap-2">
                Sign Up Free <ArrowRight size={18} />
              </button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">No credit card required. Free plan includes 100 feedback analyses per month.</p>
        </div>
      </section>
    </div>
  );
}

/* FeatureCard Component */
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

/* StepCard Component */
const StepCard = ({ step, title, description }) => (
  <div className="p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700 relative">
    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
      {step}
    </div>
    <div className="pt-4">
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

/* Testimonial Component */
const Testimonial = ({ name, role, company, image, feedback }) => (
  <div className="p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden mr-4">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-bold text-xl">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <h4 className="font-bold text-white">{name}</h4>
        <p className="text-sm text-gray-400">{role}, {company}</p>
      </div>
    </div>
    <p className="italic text-gray-300">"{feedback}"</p>
  </div>
);

/* Stat Card Component */
const StatCard = ({ number, text }) => (
  <div className="p-4">
    <div className="text-4xl md:text-5xl font-bold mb-2">{number}</div>
    <div className="text-sm md:text-base opacity-80">{text}</div>
  </div>
);

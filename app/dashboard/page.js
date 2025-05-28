"use client";

import { useSessionContext } from "@/app/components/SessionWrapper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, 
  PieChart, Pie, Cell, Legend, CartesianGrid, AreaChart, Area
} from "recharts";
import { 
  BarChart2, TrendingUp, PieChart as PieChartIcon, MessageSquare, 
  AlertTriangle, ThumbsUp, ThumbsDown, Filter, Download, RefreshCw, Loader2
} from "lucide-react";

export default function Dashboard() {
  const { session, loading } = useSessionContext();
  const router = useRouter();

  const [sentimentData, setSentimentData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [session, loading, router]);

  useEffect(() => {
    if (session) {
      fetchAllData();
    }
  }, [session, timeRange]);

  const fetchAllData = async () => {
    setDataLoading(true);
    await Promise.all([
      fetchSentimentData(),
      fetchTrendData(),
      fetchTopicData(),
      fetchRecentFeedback()
    ]);
    setDataLoading(false);
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
  };

  const fetchSentimentData = async () => {
    try {
      const response = await fetch(`/api/sentiment-stats?timeRange=${timeRange}`);
      if (!response.ok) {
        console.error(`Sentiment stats API error: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.error(`Response content: ${text.substring(0, 200)}...`);
        setSentimentData([
          { name: "Positive", count: 0, percentage: 0 },
          { name: "Neutral", count: 0, percentage: 0 },
          { name: "Negative", count: 0, percentage: 0 }
        ]);
        return;
      }
      const data = await response.json();
      setSentimentData(data.length > 0 ? data : [
        { name: "Positive", count: 0, percentage: 0 },
        { name: "Neutral", count: 0, percentage: 0 },
        { name: "Negative", count: 0, percentage: 0 }
      ]);
    } catch (error) {
      console.error("Error fetching sentiment data:", error);
      setSentimentData([
        { name: "Positive", count: 0, percentage: 0 },
        { name: "Neutral", count: 0, percentage: 0 },
        { name: "Negative", count: 0, percentage: 0 }
      ]);
    }
  };

  const fetchTrendData = async () => {
    try {
      const response = await fetch(`/api/trends?timeRange=${timeRange}`);
      if (!response.ok) {
        console.error(`Trends API error: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.error(`Response content: ${text.substring(0, 200)}...`);
        setTrendData([]);
        return;
      }
      const data = await response.json();
      setTrendData(data);
    } catch (error) {
      console.error("Error fetching trend data:", error);
      setTrendData([]);
    }
  };

  const fetchTopicData = async () => {
    try {
      const response = await fetch(`/api/topics?timeRange=${timeRange}`);
      if (!response.ok) {
        console.error(`Topics API error: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.error(`Response content: ${text.substring(0, 200)}...`);
        setTopicData([]);
        return;
      }
      console.log({response});
      const data = await response.json();
      console.log(data);
      setTopicData(data);
    } catch (error) {
      console.error("Error fetching topic data:", error);
      setTopicData([]);
    }
  };

  const fetchRecentFeedback = async () => {
    try {
      const response = await fetch("/api/recent-feedback");
      if (!response.ok) {
        console.error(`Recent feedback API error: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.error(`Response content: ${text.substring(0, 200)}...`);
        setRecentFeedback([]);
        return;
      }
      const data = await response.json();
      setRecentFeedback(data);
    } catch (error) {
      console.error("Error fetching recent feedback:", error);
      setRecentFeedback([]);
    }
  };

  const exportData = () => {
    // In a real app, this would generate a CSV or Excel file with the dashboard data
    alert("Data export functionality would be implemented here");
  };

  const COLORS = ["#4CAF50", "#FFB300", "#E53935", "#42A5F5"];
  const SENTIMENT_COLORS = {
    positive: "#4CAF50",
    neutral: "#FFB300",
    negative: "#E53935"
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      case "neutral":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-500 mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feedback Analytics Dashboard</h1>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          <button 
            onClick={refreshData} 
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            disabled={refreshing}
          >
            <RefreshCw className={`h-5 w-5 text-gray-600 dark:text-gray-300 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          
          <button 
            onClick={exportData}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <Download className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Sentiment Summary Cards */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Positive Feedback</h2>
            <ThumbsUp className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {sentimentData.find(item => item.name === "Positive")?.percentage || 0}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {sentimentData.find(item => item.name === "Positive")?.count || 0} feedbacks
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Neutral Feedback</h2>
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {sentimentData.find(item => item.name === "Neutral")?.percentage || 0}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {sentimentData.find(item => item.name === "Neutral")?.count || 0} feedbacks
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Negative Feedback</h2>
            <ThumbsDown className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {sentimentData.find(item => item.name === "Negative")?.percentage || 0}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {sentimentData.find(item => item.name === "Negative")?.count || 0} feedbacks
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sentiment Analysis Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sentiment Analysis</h2>
          </div>
          
          {sentimentData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentimentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="count" fill="#4CAF50">
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.name.toLowerCase()] || "#4CAF50"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">No data available</p>
            </div>
          )}
        </div>

        {/* Sentiment Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <PieChartIcon className="h-5 w-5 text-purple-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sentiment Distribution</h2>
          </div>
          
          {sentimentData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.name.toLowerCase()] || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">No data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Trend Analysis Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Feedback Trends Over Time</h2>
        </div>
        
        {trendData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F9FAFB'
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="positive" stackId="1" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.6} />
                <Area type="monotone" dataKey="neutral" stackId="1" stroke="#FFB300" fill="#FFB300" fillOpacity={0.6} />
                <Area type="monotone" dataKey="negative" stackId="1" stroke="#E53935" fill="#E53935" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">No trend data available</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Topics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Mentioned Topics</h2>
          </div>
          
          {topicData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={topicData}
                  margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#6B7280" />
                  <YAxis dataKey="topic" type="category" stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="count" fill="#42A5F5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">No topic data available</p>
            </div>
          )}
        </div>

        {/* Recent Feedback */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-5 w-5 text-green-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Feedback</h2>
          </div>
          
          {recentFeedback.length > 0 ? (
            <div className="h-80 overflow-y-auto">
              <div className="space-y-4">
                {recentFeedback.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="mr-2">{getSentimentIcon(item.sentiment)}</div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">No recent feedback available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

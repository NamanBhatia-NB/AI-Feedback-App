import connectDB from "@/app/utils/db";
import ResponseModel from "@/app/models/Response";

export async function GET(req) {
  try {
    console.log("Topics API called");
    
    // Connect to the database
    try {
      await connectDB();
      console.log("Connected to MongoDB in topics API");
    } catch (dbError) {
      console.error("MongoDB connection error in topics API:", dbError);
      return Response.json({ error: "Database connection failed" }, { status: 500 });
    }
    
    // Get the time range from query parameters
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get('timeRange') || 'month';
    console.log(`Time range: ${timeRange}`);
    
    // Calculate the date range based on the timeRange parameter
    const endDate = new Date();
    let startDate = new Date();
    
    switch(timeRange) {
      case 'week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(endDate.getMonth() - 1);
    }
    
    console.log(`Date range: ${startDate.toISOString()} to ${endDate.toISOString()}`);
    
    try {
      // Find all responses within the date range
      const responses = await ResponseModel.find({
        createdAt: { $gte: startDate, $lte: endDate }
      });
      
      console.log(`Found ${responses.length} responses in the date range`);
      
      // Count topic occurrences
      const topicCounts = {};
      responses.forEach(response => {
        if (Array.isArray(response.topics)) {
          console.log(response)
          response.topics.forEach(topic => {
            if (topic) {
              const normalizedTopic = topic.trim();
              if (normalizedTopic) {
                topicCounts[normalizedTopic] = (topicCounts[normalizedTopic] || 0) + 1;
              }
            }
          });
        }
      });
      
      // Convert to array and sort by count
      const topicsArray = Object.entries(topicCounts).map(([topic, count]) => ({
        topic,
        count
      })).sort((a, b) => b.count - a.count);
      
      // Take the top 5 topics
      const topTopics = topicsArray.slice(0, 5);
      
      console.log(`Returning ${topTopics.length} topics`);
      return Response.json(topTopics);
    } catch (queryError) {
      console.error("MongoDB query error in topics API:", queryError);
      return Response.json({ error: "Error querying the database" }, { status: 500 });
    }
  } catch (error) {
    console.error("Unhandled error in topics API:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
} 
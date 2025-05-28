import connectDB from "@/app/utils/db";
import ResponseModel from "@/app/models/Response";

export async function GET(req) {
  try {
    console.log("Sentiment stats API called");
    
    // Connect to the database
    try {
      await connectDB();
      console.log("Connected to MongoDB in sentiment-stats API");
    } catch (dbError) {
      console.error("MongoDB connection error in sentiment-stats API:", dbError);
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
      // Query to get sentiment counts
      const sentimentCounts = await ResponseModel.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: "$sentiment",
            count: { $sum: 1 }
          }
        }
      ]);
      
      console.log("Sentiment counts:", JSON.stringify(sentimentCounts));
      
      // Calculate total for percentage
      const total = sentimentCounts.reduce((sum, item) => sum + item.count, 0);
      
      // Format the response
      const formattedData = sentimentCounts.map(item => ({
        name: item._id.charAt(0).toUpperCase() + item._id.slice(1).toLowerCase(),
        count: item.count,
        percentage: total > 0 ? Math.round((item.count / total) * 100) : 0
      }));
      
      // Ensure all sentiment types are included even if count is 0
      const sentimentTypes = ["Positive", "Neutral", "Negative"];
      sentimentTypes.forEach(type => {
        if (!formattedData.find(item => item.name === type)) {
          formattedData.push({ name: type, count: 0, percentage: 0 });
        }
      });
      
      console.log("Returning formatted data:", JSON.stringify(formattedData));
      return Response.json(formattedData);
    } catch (queryError) {
      console.error("MongoDB query error in sentiment-stats API:", queryError);
      return Response.json({ error: "Error querying the database" }, { status: 500 });
    }
  } catch (error) {
    console.error("Unhandled error in sentiment-stats API:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

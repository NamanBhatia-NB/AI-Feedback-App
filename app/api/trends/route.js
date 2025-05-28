import connectDB from "@/app/utils/db";
import ResponseModel from "@/app/models/Response";

export async function GET(req) {
  try {
    console.log("Trends API called");
    
    // Connect to the database
    try {
      await connectDB();
      console.log("Connected to MongoDB in trends API");
    } catch (dbError) {
      console.error("MongoDB connection error in trends API:", dbError);
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
      // Group by date and sentiment
      const trendData = await ResponseModel.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: {
              date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              sentiment: "$sentiment"
            },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: "$_id.date",
            sentiments: {
              $push: {
                sentiment: "$_id.sentiment",
                count: "$count"
              }
            }
          }
        },
        {
          $sort: { "_id": 1 }
        }
      ]);
      
      console.log(`Found trend data with ${trendData.length} days`);
      
      // Transform the data to the expected format
      const formattedData = trendData.map(item => {
        const result = {
          date: item._id,
          positive: 0,
          neutral: 0,
          negative: 0
        };
        
        item.sentiments.forEach(s => {
          const sentiment = s.sentiment.toLowerCase();
          if (sentiment === "positive" || sentiment === "neutral" || sentiment === "negative") {
            result[sentiment] = s.count;
          }
        });
        
        return result;
      });
      
      console.log(`Returning ${formattedData.length} data points`);
      return Response.json(formattedData);
    } catch (queryError) {
      console.error("MongoDB query error in trends API:", queryError);
      return Response.json({ error: "Error querying the database" }, { status: 500 });
    }
  } catch (error) {
    console.error("Unhandled error in trends API:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

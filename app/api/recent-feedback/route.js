import connectDB from "@/app/utils/db";
import ResponseModel from "@/app/models/Response";

export async function GET(req) {
  try {
    console.log("Recent feedback API called");
    
    // Connect to the database
    try {
      await connectDB();
      console.log("Connected to MongoDB in recent-feedback API");
    } catch (dbError) {
      console.error("MongoDB connection error in recent-feedback API:", dbError);
      return Response.json({ error: "Database connection failed" }, { status: 500 });
    }
    
    try {
      // Get 10 most recent feedback entries
      const recentFeedback = await ResponseModel.find()
        .sort({ createdAt: -1 })
        .limit(10);
      
      console.log(`Found ${recentFeedback.length} recent feedback entries`);
      
      // Transform the data to the expected format
      const formattedData = recentFeedback.map(item => ({
        text: item.feedback,
        sentiment: item.sentiment,
        date: item.createdAt,
        confidence: item.confidence
      }));
      
      return Response.json(formattedData);
    } catch (queryError) {
      console.error("MongoDB query error in recent-feedback API:", queryError);
      return Response.json({ error: "Error querying the database" }, { status: 500 });
    }
  } catch (error) {
    console.error("Unhandled error in recent-feedback API:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
} 
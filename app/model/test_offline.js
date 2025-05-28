// Test script for offline mode
const { analyzeSentimentWithModel } = require("../utils/sentimentAnalyzer");

// Fallback responses based on sentiment (same as in route.js)
const FALLBACK_RESPONSES = {
  Positive:
    "Thank you for your positive feedback! We're delighted to hear that you had a great experience with our product. Your satisfaction is our priority, and we appreciate you taking the time to share your thoughts.",
  Negative:
    "We sincerely apologize for your experience. Your feedback is important to us, and we'll use it to improve our products and services. Please reach out to our customer service team if there's anything we can do to address your concerns.",
  Neutral:
    "Thank you for sharing your feedback. We appreciate your honest assessment and will take your comments into consideration as we continue to improve our products and services. Please don't hesitate to reach out if you have any other thoughts.",
};

async function testOfflineMode() {
  console.log("Testing sentiment analysis with offline response generation\n");

  // Test cases with different sentiments
  const testCases = [
    {
      text: "This product is amazing and works perfectly!",
      price: 299.99,
      expected: "Positive",
    },
    {
      text: "Very disappointed with the quality, broke after a few days.",
      price: 19.99,
      expected: "Negative",
    },
    {
      text: "The product arrived on time. It functions as expected.",
      price: 150,
      expected: "Neutral",
    },
  ];

  for (const test of testCases) {
    console.log(`\n=== Testing feedback: "${test.text}" ===`);

    try {
      // Step 1: Analyze sentiment using our ML model
      const sentimentResult = await analyzeSentimentWithModel(
        test.text,
        test.price
      );
      console.log(
        `Sentiment: ${sentimentResult.sentiment} (${sentimentResult.confidence}% confidence)`
      );

      // Step 2: Generate appropriate response based on sentiment
      const fallbackResponse =
        FALLBACK_RESPONSES[sentimentResult.sentiment] ||
        "Thank you for your feedback. We value your input and will use it to improve our products and services.";

      console.log("\nGenerated offline response:");
      console.log("------------------------");
      console.log(fallbackResponse);
      console.log("------------------------");

      // Validation
      if (sentimentResult.sentiment === test.expected) {
        console.log(
          `✅ Test passed: sentiment "${sentimentResult.sentiment}" matches expected "${test.expected}"`
        );
      } else {
        console.log(
          `❌ Test failed: sentiment "${sentimentResult.sentiment}" doesn't match expected "${test.expected}"`
        );
      }
    } catch (error) {
      console.error("Error during test:", error);
    }
  }
}

testOfflineMode();

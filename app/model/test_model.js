const { analyzeSentimentWithModel } = require("../utils/sentimentAnalyzer");

async function testModel() {
  console.log("Testing sentiment analysis model...");

  // Test cases
  const tests = [
    { text: "This product is amazing and works perfectly!", price: 299.99 },
    {
      text: "Very disappointed with the quality, broke after a few days.",
      price: 19.99,
    },
    {
      text: "The product arrived on time. It functions as expected.",
      price: 150,
    },
  ];

  for (const test of tests) {
    console.log(`\nAnalyzing: "${test.text}"`);
    console.log(`Price: ${test.price}`);

    try {
      const result = await analyzeSentimentWithModel(test.text, test.price);
      console.log("Result:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

testModel();

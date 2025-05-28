// Test script for Gemini API integration
require("dotenv").config({ path: ".env.local" });
const fetch = require("node-fetch");

async function testGeminiAPI() {
  console.log("Testing Gemini API integration...");

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "YOUR_ACTUAL_GEMINI_API_KEY_HERE") {
    console.error(
      "ERROR: Missing or invalid GEMINI_API_KEY in .env.local file"
    );
    console.error(
      "Please get a valid API key from https://aistudio.google.com/"
    );
    console.error("Then update the .env.local file with your key");
    return;
  }

  console.log(
    "API Key found:",
    apiKey.substring(0, 4) + "..." + apiKey.substring(apiKey.length - 4)
  );

  const prompt = `
    The following customer feedback has been analyzed as Positive.
    
    Customer feedback: "I love this product! Works exactly as described."
    
    Based on this sentiment analysis, provide a professional, empathetic and personalized response to the customer.
    The response should acknowledge their feedback and match the sentiment of their experience.
    Keep the response under 3 sentences and make it sound natural and sincere.
    
    ONLY provide the response text, with no additional formatting or explanation.
  `;

  try {
    console.log("Sending request to Gemini API...");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      console.error("Status:", response.status, response.statusText);

      if (response.status === 400) {
        console.error("This could be due to an invalid API key format");
      } else if (response.status === 403) {
        console.error("This could be due to API key permissions or quotas");
      }

      return;
    }

    const data = await response.json();
    console.log("API Response received:", data);

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const customerResponse = data.candidates[0].content.parts[0].text.trim();
      console.log("\nGenerated customer response:");
      console.log("------------------------");
      console.log(customerResponse);
      console.log("------------------------");
      console.log(
        "\nSuccess! Your Gemini API integration is working correctly."
      );
    } else {
      console.error("Unexpected response format:", data);
    }
  } catch (error) {
    console.error("Error testing Gemini API:", error);
  }
}

testGeminiAPI();

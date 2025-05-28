const { spawn } = require("child_process");
const path = require("path");

/**
 * Analyzes sentiment using the Python model
 * @param {string} review - The text to analyze
 * @param {number|null} rating - Optional rating for enhanced analysis
 * 
 * @returns {Promise<Object>} - Sentiment analysis result
 */
async function analyzeSentimentWithModel(review, rating = null) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      path.join(process.cwd(), "app/model/prediction.py"),
      review,
      rating !== null ? rating.toString() : "",
    ]);

    let result = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
        console.error(`Error: ${error}`);
        // Fallback to default values if Python model fails
        resolve({
          sentiment: "Neutral",
          confidence: 50,
        });
      } else {
        try {
          // Parse the sentiment and confidence from the Python output
          const lines = result.trim().split("\n");
          let sentiment = "Neutral";
          let confidence = 50;
          let rating = 0;
          let keyInsights = [];

          for (const line of lines) {
            if (line.includes("Sentiment:")) {
              sentiment = line.split("Sentiment:")[1].trim();
            }
            if (line.includes("Rating:")) {
              const ratingMatch = line.match(
                /Rating: (\d)/
              );
              rating = parseFloat(ratingMatch[1]);
            }
            if (line.includes("Confidence level:")) {
              const confidenceMatch = line.match(
                /Confidence level: (\d+\.?\d*)%/
              );
              if (confidenceMatch && confidenceMatch[1]) {
                confidence = parseFloat(confidenceMatch[1]);
              }
            }
            if (line.includes("Key insights:")) {
              const insightsLine = line.split("Key insights:")[1].trim();
              keyInsights = insightsLine.split(",").map((kw) => kw.trim());
              console.log(keyInsights)
              console.log("Ho")
            }
          }

          resolve({
            sentiment: sentiment,
            confidence: confidence,
            rating: rating,
            keyInsights: keyInsights
          });
        } catch (e) {
          console.error("Failed to parse Python output:", e);
          console.error("Output was:", result);
          resolve({
            sentiment: "Neutral",
            confidence: 50,
            rating: 3,
            keyInsights: [],
          });
        }
      }
    });
  });
}

module.exports = {
  analyzeSentimentWithModel,
};

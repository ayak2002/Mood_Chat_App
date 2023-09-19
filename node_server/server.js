const express = require('express');
const bodyParser = require('body-parser');
const { LanguageServiceClient } = require('@google-cloud/language');
const cors = require('cors'); // Import the CORS library

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Set up CORS to allow requests
app.use(cors());

// Set the path to your Google Cloud JSON key file
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'mood-chat-398712-15589efbbd2c.json';

// Create a new instance of the LanguageServiceClient
const languageClient = new LanguageServiceClient();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define a function to interpret sentiment scores
function interpretSentimentScore(score) {
    if (score >= -1 && score < -0.8) {
      return 'Extremely bad 😡';
    } else if (score >= -0.8 && score < -0.6) {
      return 'Very bad 😠';
    } else if (score >= -0.6 && score < -0.4) {
      return 'Bad 😤';
    } else if (score >= -0.4 && score < -0.3) {
      return 'Not great 😒';
    } else if (score >= -0.3 && score < 0.3) {
      return 'Neutral 😐';
    } else if (score >= 0.3 && score < 0.4) {
      return 'Not bad 😊';
    } else if (score >= 0.4 && score < 0.6) {
      return 'Good 😀';
    } else if (score >= 0.6 && score < 0.8) {
      return 'Very good 😄';
    } else if (score >= 0.8 && score <= 1) {
      return 'Extremely good 🌟';
    } else {
      return 'Unknown 🤔';
    }
  }
app.post('/analyze-text', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      // Handle the case where 'text' is empty or not provided
      return res.status(400).json({ error: 'Text is empty or not provided.' });
    }

    // Analyze the text using the Natural Language API
    const [result] = await languageClient.analyzeSentiment({
      document: {
        content: text,
        type: 'PLAIN_TEXT',
      },
    });

    // Extract sentiment score and magnitude from the result
    const sentiment = result.documentSentiment;

    // Interpret the sentiment score
    const mood = interpretSentimentScore(sentiment.score);

    res.json({
      mood, // Return the mood interpretation instead of score and magnitude
    });
  } catch (error) {
    console.error('Error analyzing text:', error);
    res.status(500).json({ error: 'An error occurred during text analysis.' });
  }
});
const { analyzeText } = require('../src/component/TextAnalysis');

// Map different moods to sentiment categories
const moodToSentiment = {
  'Extremely bad 😡': 'Negative',
  'Very bad 😠': 'Negative',
  'Bad 😤': 'Negative',
  'Not great 😒': 'Negative',
  'Neutral 😐': 'Neutral',
  'Not bad 😊': 'Positive',
  'Good 😀': 'Positive',
  'Very good 😄': 'Positive',
  'Extremely good 🌟': 'Positive',
  'Unknown 🤔': 'Neutral',
  // Add more mappings for other moods if needed
};

describe('Sentiment Analysis', () => {
  for (const mood of Object.keys(moodToSentiment)) {
    it(`should analyze text as ${moodToSentiment[mood]}`, async () => {
      const text = `My day is ${mood}.`;
      const result = await analyzeText(text);
      const expectedSentiment = moodToSentiment[mood];
      const generalMood = moodToSentiment[result.mood]
      expect(generalMood).toBe(expectedSentiment);
    });
  }
});

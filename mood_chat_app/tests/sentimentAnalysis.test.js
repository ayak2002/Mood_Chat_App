const { analyzeText } = require('../src/component/TextAnalysis');

describe('Sentiment Analysis', () => {
  it('should analyze text as positive', async () => {
    const positiveMoods = [
      'Good 😀',
      'Very good 😄',
      'Extremely good 🌟',
    ];

    for (const mood of positiveMoods) {
      const text = `This is a ${mood} message.`;
      const result = await analyzeText(text);
      expect(result.mood).toBe('Positive');
    }
  });

  it('should analyze text as negative', async () => {
    const negativeMoods = [
      'Extremely bad 😡',
      'Very bad 😠',
      'Bad 😤',
    ];

    for (const mood of negativeMoods) {
      const text = `This is a ${mood} message.`;
      const result = await analyzeText(text);
      expect(result.mood).toBe('Negative');
    }
  });

  it('should analyze text as neutral', async () => {
    const neutralMoods = [
      'Not great 😒',
      'Neutral 😐',
      'Not bad 😊',
      'Unknown 🤔',
    ];

    for (const mood of neutralMoods) {
      const text = `This is a ${mood} message.`;
      const result = await analyzeText(text);
      expect(result.mood).toBe('Neutral');
    }
  });

  it('should handle an error during analysis', async () => {
    const text = 'Invalid text that causes an error.';

    try {
      await analyzeText(text);
      fail('Expected an error, but no error was thrown.');
    } catch (error) {
      expect(error.message).toContain('Error analyzing text:');
    }
  });
});

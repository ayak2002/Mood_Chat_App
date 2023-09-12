import axios from "axios";

const analyzeText = async (text) => {
  try {
    const response = await axios.post("http://localhost:3001/analyze-text", { text });
    return response.data;
  } catch (error) {
    console.error("Error analyzing text:", error);
    throw error;
  }
};

export { analyzeText };

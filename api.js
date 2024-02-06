import axios from "axios";

const baseUrl = "https://nc-news-ssy5.onrender.com/api";

export const getAllArticles = async () => {
  try {
    const response = await axios.get(`${baseUrl}/articles`);
    return response.data.articles;
  } catch (error) {
    throw new Error('Error fetching articles:"');
  }
};

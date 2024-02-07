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

export const getArticleById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/articles/${id}`);
    return response.data.article;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const getCommentsByArticleID = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/articles/${id}/comments`);
    return response.data.comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const patchArticleVotes = async (id, vote) => {
  console.log(vote);
  try {
    const response = await axios.patch(`${baseUrl}/articles/${id}`, {
      newVote: vote,
    });
    return response.data;
  } catch (error) {
    console.error("Error patching article votes:", error);
    throw error;
  }
};

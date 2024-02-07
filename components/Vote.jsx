import { useEffect, useState } from "react";
import { patchArticleVotes } from "../api";
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

function Vote({ article }) {
  const [articleVote, setArticleVote] = useState(article.votes);
  const [voteStatus, setVoteStatus] = useState(
    parseInt(localStorage.getItem(`vote_${article.article_id}`)) || null
  );
  const [patchSuccess, setPatchSuccess] = useState(true);

  useEffect(() => {
    setArticleVote(article.votes);
  }, [article]);

  const handleVote = async (vote) => {
    setArticleVote(articleVote + vote); 
    setVoteStatus(vote);

    try {
    
      await patchArticleVotes(article.article_id, vote);
    } catch (error) {
      setArticleVote(articleVote - vote); 
      setVoteStatus(null);
      console.error("Error patching article votes:", error);
      setPatchSuccess(false);
    }
  };

  return (
    <div className="vote-section">
      <button
        className={` hover-item ${voteStatus === 1 ? "active" : ""}`}
        aria-label="Upvote"
        onClick={() => handleVote(1)}
        disabled={voteStatus === -1}
      >
        <ArrowUp fontSize={32} />
      </button>
      <p aria-live="polite">Votes: {articleVote}</p>
      <button
        className={`fa fa-arrow-down hover-item ${
          voteStatus === -1 ? "active" : ""
        }`}
        aria-label="Downvote"
        onClick={() => handleVote(-1)}
        disabled={voteStatus === 1}
      >
        <ArrowDown fontSize={32} />
      </button>
      {!patchSuccess && <p role="alert">Vote failed</p>}
    </div>
  );
}

export default Vote;

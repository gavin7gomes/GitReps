import React from 'react';
import style from "./GithubLoginModalStyles.module.css"

function GitHubLoginModal({ isOpen, onClose, onLogin }) {
  return (
    isOpen && (
      <div className={style["modal"]}>
        <div className={style["modal-content"]}>
          <div className={style["modal-header"]}>
            <h2>GitHub Sign In</h2>
            <button onClick={onClose}>Close</button>
          </div>
          <p>You are not logged in. Please log in to search repos.</p>
          <button className={style["github-signin-button"]} onClick={onLogin}>Sign in to GitHub</button>
        </div>
      </div>
    )
  );
}

export default GitHubLoginModal;

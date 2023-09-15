import React from 'react';
import styles from './RepoCard.module.css';
import { formatRelativeTime, getRandomColor, truncateText } from '../../utils/misc';
import { FaStar } from 'react-icons/fa';

const RepositoryCard = ({ repo }) => {
    const topics = repo.topics.slice(0, 6);
  return (
    <div className={styles['repository-card']}>
      <div className={styles["avatar"]}>
        <img src={repo.owner.avatar_url} alt={`${repo.owner.login}'s avatar`} />
      </div>
      <div className={styles["repo-info"]}>
        <h2 className={styles["repo-name"]}>{repo.name}</h2>
        <p className={styles["description"]}>{truncateText(repo.description, 150)}</p>
        <div className={styles['topics']}>
          {topics.map((topic, index) => (
            <span key={index} className={styles['topic-badge']} style={{ backgroundColor: getRandomColor() }}>
              {topic}
            </span>
          ))}
        </div>
        <p className={styles["language"]}>Language: {repo.language}</p>
        <div className={styles['stars-container']}>
          <FaStar className={styles['star-icon']} />
          <p className={styles['stars']}>{repo.stargazers_count}</p>
        </div>
        <p className={styles["updated-at"]}>Updated: {formatRelativeTime(repo.updated_at)}</p>
      </div>
    </div>
  );
}

export default RepositoryCard;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  updatePost,
  deletePost,
  toggleComments,
} from '../features/posts/postsSlice';
import CommentList from './CommentList';
import styles from '../styles/PostCard.module.css';

export default function PostCard({ post }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(post.text);

  const startEdit = () => {
    setDraft(post.text);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const trimmed = draft.trim();
    if (trimmed) dispatch(updatePost({ id: post.id, text: trimmed }));
    setIsEditing(false);
  };

  const cancelEdit = () => setIsEditing(false);

  return (
    <article className={styles.card}>
      {isEditing ? (
        <div className={styles.editRow}>
          <input
            className={styles.editInput}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={280}
            autoFocus
          />
          <button className={styles.btnPrimary} onClick={saveEdit}>
            Подтвердить
          </button>
          <button className={styles.btnPink} onClick={cancelEdit}>
            Закрыть
          </button>
        </div>
      ) : (
        <p className={styles.text}>{post.text}</p>
      )}

      <div className={styles.actions}>
        <button
          className={styles.btnPrimary}
          onClick={() => dispatch(toggleComments(post.id))}
        >
          Комментарии
        </button>
        <span className={styles.count}>
          Количество комментариев - {post.comments.length}
        </span>
        <button className={styles.btnGhost} onClick={startEdit}>
          Изменить
        </button>
        <button
          className={styles.btnPink}
          onClick={() => dispatch(deletePost(post.id))}
        >
          Удалить
        </button>
      </div>

      {!post.commentsHidden && <CommentList postId={post.id} />}
    </article>
  );
}
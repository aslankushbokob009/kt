import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addComment,
  hideComments,
} from '../features/posts/postsSlice';
import { selectAllPosts } from '../features/posts/postsSelectors';
import CommentItem from './CommentItem';
import styles from '../styles/CommentList.module.css';

export default function CommentList({ postId }) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const post = useSelector(selectAllPosts).find((p) => p.id === postId);

  if (!post) return null;

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch(addComment(postId, trimmed));
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Новый комментарий ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={200}
        />
        <button className={styles.btnAdd} onClick={handleAdd}>
          Добавить
        </button>
      </div>

      {post.comments.map((c) => (
        <CommentItem key={c.id} postId={postId} comment={c} />
      ))}

      <button
        className={styles.btnHide}
        onClick={() => dispatch(hideComments(postId))}
      >
        Спрятать
      </button>
    </div>
  );
}
import { useDispatch } from 'react-redux';
import { deleteComment } from '../features/posts/postsSlice';
import styles from '../styles/CommentItem.module.css';

const COLORS = [
  '#3d7eff', '#ff4d8d', '#ffa62b', '#22b07d',
  '#8e5cff', '#00b8d9', '#e85c4a', '#5c7cfa',
];

function colorFor(name = '') {
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return COLORS[sum % COLORS.length];
}

export default function CommentItem({ postId, comment }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment({ postId, commentId: comment.id }));
  };

  return (
    <div className={styles.item}>
      <div
        className={styles.avatar}
        style={{ background: colorFor(comment.author) }}
      >
        {comment.author.charAt(0).toUpperCase()}
      </div>

      <div className={styles.body}>
        <div className={styles.author}>
          {comment.author}
          <span className={styles.time}>{comment.time}</span>
        </div>
        <div className={styles.text}>{comment.text}</div>
      </div>

      <button className={styles.del} onClick={handleDelete}>
        Удалить
      </button>
    </div>
  );
}
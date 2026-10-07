import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../features/posts/postsSlice';
import styles from '../styles/NewPostForm.module.css';

export default function NewPostForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch(addPost(trimmed));
    setText('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Новый пост ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={280}
      />
      <button type="submit" className={styles.btn}>
        Добавить
      </button>
    </form>
  );
}
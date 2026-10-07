import { useSelector } from 'react-redux';
import { selectAllPosts } from '../features/posts/postsSelectors';
import PostCard from './PostCard';
import styles from '../styles/PostList.module.css';

export default function PostList() {
  const posts = useSelector(selectAllPosts);

  if (!posts.length) {
    return <p className={styles.empty}>Пока нет ни одного поста.</p>;
  }

  return (
    <section className={styles.list}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
import Header from './components/Header';
import NewPostForm from './components/NewPostForm';
import PostList from './components/PostList';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <NewPostForm />
      <PostList />
    </div>
  );
}
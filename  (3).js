import { createSlice, nanoid } from '@reduxjs/toolkit';

/* Начальные данные — как в макете */
const initialPosts = [
  {
    id: nanoid(),
    text: 'Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.',
    commentsHidden: false,
    comments: [
      {
        id: nanoid(),
        author: 'Мария',
        time: '5 мин назад',
        text: 'Отличная идея! Я только за, давайте в 19:00 у того итальянского местечка.',
      },
      {
        id: nanoid(),
        author: 'Алексей',
        time: '3 мин назад',
        text: 'Поддерживаю. Забронирую столик на веранде, если погода не подведёт.',
      },
    ],
  },
  {
    id: nanoid(),
    text: 'Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.',
    commentsHidden: false,
    comments: [
      {
        id: nanoid(),
        author: 'Кристина',
        time: '1 мин назад',
        text: 'Я давно хотела выбраться! Возьмите меня с собой 🙌',
      },
      {
        id: nanoid(),
        author: 'Дмитрий',
        time: 'только что',
        text: 'Смотрю прогноз — обещают +18 и без дождя. Идеально.',
      },
    ],
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: initialPosts,
  },
  reducers: {
    /* ---------- Посты ---------- */
    addPost: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text,
            comments: [],
            commentsHidden: false,
          },
        };
      },
    },
    updatePost(state, action) {
      const { id, text } = action.payload;
      const post = state.items.find((p) => p.id === id);
      if (post) post.text = text;
    },
    deletePost(state, action) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    toggleComments(state, action) {
      const post = state.items.find((p) => p.id === action.payload);
      if (post) post.commentsHidden = !post.commentsHidden;
    },
    hideComments(state, action) {
      const post = state.items.find((p) => p.id === action.payload);
      if (post) post.commentsHidden = true;
    },

    /* ---------- Комментарии ---------- */
    addComment: {
      reducer(state, action) {
        const { postId, comment } = action.payload;
        const post = state.items.find((p) => p.id === postId);
        if (post) post.comments.push(comment);
      },
      prepare(postId, text) {
        return {
          payload: {
            postId,
            comment: {
              id: nanoid(),
              author: 'Вы',
              time: 'только что',
              text,
            },
          },
        };
      },
    },
    deleteComment(state, action) {
      const { postId, commentId } = action.payload;
      const post = state.items.find((p) => p.id === postId);
      if (post) {
        post.comments = post.comments.filter((c) => c.id !== commentId);
      }
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  toggleComments,
  hideComments,
  addComment,
  deleteComment,
} = postsSlice.actions;

export default postsSlice.reducer;
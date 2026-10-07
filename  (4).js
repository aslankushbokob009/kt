import { createSelector } from '@reduxjs/toolkit';

const selectPostsState = (state) => state.posts;

export const selectAllPosts = createSelector(
  [selectPostsState],
  (posts) => posts.items
);

export const selectCommentsCount = (postId) =>
  createSelector(
    [selectAllPosts],
    (items) => items.find((p) => p.id === postId)?.comments.length ?? 0
  );
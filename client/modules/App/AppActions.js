// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';

export const TOGGLE_EDIT_POST = 'TOGGLE_EDIT_POST';

export const SORT_POST = 'SORT_POST';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

// Export Actions
export function toggleEditPost(post) {
  return {
    type: TOGGLE_EDIT_POST,
    post
  };
}

// Export Actions
export function sortPosts(posts) {
  return {
    type: SORT_POST,
    posts,
  };
}


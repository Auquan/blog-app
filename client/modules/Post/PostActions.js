import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const GET_POST = 'GET_POST';
export const SORT_BY_TIME = 'SORT_BY_TIME';
export const SORT_BY_VISITS = 'SORT_BY_VISITS';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
        visits: post.visits,
      },
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function editPostRequest(post) {
  return (dispatch) => {
    return callApi(`posts/${post.cuid}/${post.slug}`, 'put', {
      data: {
        name: post.name,
        title: post.title,
        content: post.content,
        visits: post.visits,
      },
    }).then(res => dispatch(editPost(res.post)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function getPostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function getPost(post) {
  return {
    type: GET_POST,
    post,
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function sortByTime() {
  return {
    type: SORT_BY_TIME,
  };
}

export function sortByVisits() {
  return {
    type: SORT_BY_VISITS,
  };
}

export function updatePost(cuid) {
  return {
    type: UPDATE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}

export function increasePostRequest(cuid) {
  return callApi(`posts/${cuid}`, 'put').then((res) => dispatch(getPost(res.post)));
}

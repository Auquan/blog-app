import { ADD_POST, ADD_POSTS, DELETE_POST, UPDATE_POST, GET_POST, SORT_BY_VISITS, SORT_BY_TIME, increasePostRequest } from './PostActions';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        data: action.posts,
      };

    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };
    case UPDATE_POST :
      return {
        data: state.data.filter(post => post.cuid === action.cuid),
      };
    case GET_POST :
      return {
        data: state.data.filter(post => post.cuid === action.cuid),
      };
      case SORT_BY_TIME: {
        state.data.sort((a, b) => {
          a = new Date(a.dateAdded);
          b = new Date(b.dateAdded);
          return a>b ? -1 : a<b ? 1 : 0;
        })
        return {
          data: Array.from(state.data),
          showEditPost: initialState.showEditPost,
          post: initialState.post,
        };
      };
      case SORT_BY_VISITS:
      state.data.sort((a, b) => (parseInt(a.visits) > parseInt(b.visits)) ? 1 : -1);
      return {
        data: Array.from(state.data),
      };
    default:
      return state;
  }
};

/* Selectors */
// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

export const getPostAfterIncrementing = (state, cuid) => {
  let post = state.posts.data.filter(post => post.cuid === cuid)[0];
  post.visits++;
  increasePostRequest(post.cuid);
  return post;
};

// Export Reducer
export default PostReducer;

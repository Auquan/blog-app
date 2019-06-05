import { ADD_POST, ADD_POSTS, DELETE_POST, EDIT_POST, UPDATE_POST, GET_POST, SORT_BY_VISITS, SORT_BY_TIME, increasePostRequest } from './PostActions';
import { TOGGLE_ADD_POST } from '../App/AppActions';

// Initial State
const initialState = { 
  data: [],
  editData: {},
  showEditPost: false,
 };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        data: [action.post, ...state.data],
        showEditPost: initialState.showEditPost,
        editData: initialState.editData,
      };

    case ADD_POSTS :
      return {
        data: action.posts,
        showEditPost: initialState.showEditPost,
        editData: initialState.editData,
      };
    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
        showEditPost: initialState.showEditPost,
        editData: initialState.editData,
      };
    case UPDATE_POST :
      return {
        data: state.data.filter(post => post.cuid === action.cuid),
        showEditPost: initialState.showEditPost,
        editData: initialState.editData,
      };
    case GET_POST :
      return {
        data: state.data.filter(post => post.cuid === action.cuid),
        showEditPost: initialState.showEditPost,
        editData: initialState.editData,
      };
    case EDIT_POST:
      var remaining =  state.data.filter(post => post.cuid !== action.post.cuid);
      return{
        data: [...remaining, action.post],
        showEditPost: initialState.showEditPost,
        editData: initialState.editData,
      }
    case SORT_BY_TIME: 
      state.data.sort((a, b) => {
        a = new Date(a.dateAdded);
        b = new Date(b.dateAdded);
        return a>b ? -1 : a<b ? 1 : 0;
      })
      return {
        data: Array.from(state.data),
        showEditPost: initialState.showEditPost,
        editData: initialState.editData,
      };
    case SORT_BY_VISITS:
      state.data.sort((a, b) => (parseInt(a.visits) > parseInt(b.visits)) ? 1 : -1);
      return {
        data: Array.from(state.data),
        showEditPost: initialState.showEditPost,
        editData: initialState.editData,
      };
    default:
      return state;
  }
};

/* Selectors */
// Get all posts
export const getPosts = state => state.posts.data;

// Get Edit Data by cuid
export const getEditData = state => state.posts.getEditData;

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

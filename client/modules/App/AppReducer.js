// Import Actions
import { TOGGLE_ADD_POST, SORT_POST, TOGGLE_EDIT_POST } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showEditPost: false,
  editData: {}
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
        showEditPost: state.showEditPost,
        editData: state.editData,
      };
    case SORT_POST:
      return {
        posts: action.posts,
      };
    case TOGGLE_EDIT_POST:
      return{
        showAddPost: state.showAddPost,
        showEditPost: !state.showEditPost,
        editData: action.post,
      }  
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Get showEditPost
export const getShowEditPost = state => state.app.showEditPost;

// Get editData
export const getEditData = state => state.app.editData;

// Export Reducer
export default AppReducer;

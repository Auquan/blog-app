import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest, sortByVisits, sortByTime, editPostRequest } from '../../PostActions';
import { toggleAddPost, toggleEditPost } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPost, getShowEditPost, getEditData } from '../../../App/AppReducer';
import { getPosts } from '../../PostReducer';
import { EditPostItem } from '../../components/EditPostItem/EditPostItem';

class PostListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: undefined };
    this.state.posts = props.posts;
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleEditPost = (cuid, slug, name, title, content, visits) => {
    if (confirm('Do you want to Edit this post')) { // eslint-disable-line
      this.props.dispatch(editPostRequest({cuid, slug, name, title, content, visits}));
      this.toggleEditPost({cuid, slug, name, title, content, visits});
    }
  };

  toggleEditPost = (data) => {
    this.props.dispatch(toggleEditPost(data));
  };

  handleAddPost = (name, title, content, visits) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content, visits }));
  };
  
  sortByVisits() {
    this.props.dispatch(sortByVisits());
  }

  sortByTime() {
    this.props.dispatch(sortByTime());
  }

  render() {
    return (
      <div>
        <EditPostItem data={this.props.getEditData} editPost={this.handleEditPost} showEditPost={this.props.showEditPost}/>>
        <button onClick={() => this.sortByVisits(this.props.posts)}>sort by visits</button>
        <button onClick={() => this.sortByTime(this.props.posts)}>sort by time</button>
        <PostCreateWidget addPost={this.handleAddPost} showAddPost={this.props.showAddPost} />
        <PostList handleDeletePost={this.handleDeletePost} toggleEditPost={this.toggleEditPost} posts={this.props.posts} />
      </div>
    );
  }
}
// Actions required to provide data for this component to render in sever side.
PostListPage.need = [() => { return fetchPosts(); }];


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    getEditData: getEditData(state),
    showEditPost: getShowEditPost(state),
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    visits: PropTypes.string.isRequired,
  })).isRequired,
  showAddPost: PropTypes.bool.isRequired,
  showEditPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PostListPage);

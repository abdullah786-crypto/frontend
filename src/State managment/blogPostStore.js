import {
  addComments,
  deleteCommentById,
  getAllBlogs,
  getBlogById,
  postAllBlogs,
  updateBlogById,
  updateCommentById,
} from '@/services/blog.services';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import debounce from 'lodash/debounce';

  export const useBlogStore = defineStore('blogStore', () => {
  const editorValue = ref('');
  const posts = ref([]);
  const name = ref('');
  const email = ref('');
  const comment = ref('');
  const commentsObject = ref();
  const commentsList = ref([]);
  const blog = ref('');
  const totalRecords = ref('');
  const isLoading = ref();
  const addPostId = ref();
  const isCommentLoading = ref(false)

  const addBlogPosts = async (data) => {
    isLoading.value = true;
    try {
      const result = await postAllBlogs(data);
      addPostId.value = result.data.post.id;
      return {
        success: true,
        message: result.data.message,
      };
    } catch (error) {
      console.log('error is', error);
      return {
        success: false,
        message: error.response.data.message,
        errors: error.response.data.errors,
      };
    }
  };

const debouncedGetAllBlogs = debounce(
  (title, subtitle, page, limit, resolve, reject) => {
    getAllBlogs(title, subtitle, page, limit).then(resolve).catch(reject);
  },
  1500
);

const getBlogPosts = (title, subtitle, page, limit) => {
  isLoading.value = true;
  return new Promise((resolve, reject) => {
    debouncedGetAllBlogs(title, subtitle, page, limit, resolve, reject);
  })
  .then(result => {
    isLoading.value = false;
    totalRecords.value = result.data.totalRecords;
    posts.value = result.data.blogs;
  })
  .catch(err => {
    isLoading.value = false;
    console.error(err);
  });
};


  const getBlogPostsById = async (postId) => {
    isLoading.value = true;
    blog.value = setTimeout(async() => {
      await getBlogById(postId)
      .then((result) => {
       isLoading.value = false;
        console.log('value of the result is ', result.data.blogs);
        commentsList.value = result.data.blogs.comments;
        // console.log('new comments list is', commentsList.value);
        return result.data.blogs;
      })  
      .catch((err) => {
        return err;
      });
    }, 2000)
    console.log('vblog.cas ', blog.value);
  };
  const postComment = async (data, blogId) => {
    isCommentLoading.value = true
    try {
      const result = await addComments(data, blogId);
      let pushingComment = {
        id: result.data.comment.id,
        username: result.data.comment.username,
        email: result.data.comment.email,
        comment: result.data.comment.comment,
      };
      commentsList.value = [...commentsList.value, pushingComment];
      if (result.status === 200) {
        isCommentLoading.value = false
        return {
          success: true,
          message: result.data.message,
        };
      }
    } catch (error) {
      
      console.log('error while submitting comments', {
        success: false,
        message: error.response.data.messagge,
        errors: error.response.data.error,
      });
      console.log(
        'simple error is',
        error.response.data.error.map((e) => e),
      );
      return {
        success: false,
        message: error.response.data.messagge,
        errors: error.response.data.error.map((e) => e),
      };
    }
  };
  const editPostById = async (data, id) => {
    try {
      const result = await updateBlogById(data, id);
      return {
        success: true,
        message: result.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.data.message,
        error: error.response.data.errors,
      };
    }
  };
  const updateComment = async (data, id) => {
    try {
      const stringifyData = JSON.stringify(data);
      const result = await updateCommentById(stringifyData, id);
      return {
        success: true,
        message: result.data.message,
      };
    } catch (error) {
       let comIndex = commentsList.value.findIndex(id)
      console.log('index of comment is', comIndex)
      console.log('error', error);
      return {
        success: false,
        message: error.response.data.messagge,
        error: error.response.data.error,
      };
    }
  };
  const deleteComment = async (id) => {
    try {
      console.log('id in store is', id);
      console.log('aaaaaaaaaaaaaaaa', commentsList.value);
      const result = await deleteCommentById(id);
      commentsList.value = commentsList.value.filter((com) => com.id !== id);
      // blog.value = blog.value.comments.filter((comment) => comment.id !== id);
      return {
        success: true,
        message: result.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  };

  // const searchBlogList = async (title, subtitle) => {
  //   posts.value = await searchQuery(title, subtitle).then((res) => {
  //     return res.data.blogs;
  //   });
  //   console.log('search result is a', posts.value);
  // };

  return {
    editorValue,
    posts,
    name,
    email,
    comment,
    commentsObject,
    commentsList,
    blog,
    totalRecords,
    isLoading,
    addPostId,
    isCommentLoading,
    addBlogPosts,
    getBlogPosts,
    getBlogPostsById,
    postComment,
    updateComment,
    editPostById,
    deleteComment,
    debouncedGetAllBlogs
    // searchBlogList,
  };
});

export default useBlogStore;

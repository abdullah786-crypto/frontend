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
  const isCommentLoading = ref(false);

  const addBlogPosts = async (data) => {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1500))
    try {
      const result = await postAllBlogs(data);
      addPostId.value = result.data.post.id;
      isLoading.value = false
      return {
        success: true,
        message: result.data.message,
      };
    } catch (error) {
      isLoading.value = false
      return {
        success: false,
        message: error?.response?.data?.message,
        errors: error?.response?.data?.errors,
        generalError: error
      };
    }
  };

  const getBlogPosts = async (title, subtitle, page, limit) => {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return await getAllBlogs(title, subtitle, page, limit)
      .then((result) => {
        isLoading.value = false;
        totalRecords.value = result.data.totalRecords;
        posts.value = result.data.blogs;
      })
      .catch((err) => {
        isLoading.value = false;
        console.error(err);
      });
  };

  const getBlogPostsById = async (postId) => {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    blog.value = await getBlogById(postId)
      .then((result) => {
        isLoading.value = false;
        commentsList.value = result.data.blogs.comments;
        return result.data.blogs;
      })
      .catch((err) => {
        isLoading.value = false
        return err;
      });
  };

  const postComment = async (data, blogId) => {
    isCommentLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const result = await addComments(data, blogId);
        isCommentLoading.value = false;

      let pushingComment = {
        id: result.data.comment.id,
        username: result.data.comment.username,
        email: result.data.comment.email,
        comment: result.data.comment.comment,
      };
      commentsList.value = [...commentsList.value, pushingComment];
      if (result.status === 200) {
        isCommentLoading.value = false;
        return {
          success: true,
          message: result.data.message,
        };
      }
    } catch (error) {
      isCommentLoading.value = false;
      return {
        success: false,
        message: error.response.data.messagge,
        errors: error.response.data.error,
      };
    }
  };

  const editBlogPostById = async (data, id) => {
    isLoading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const result = await updateBlogById(data, id);
      isLoading.value = false
      return {
        success: true,
        message: result.data.message,
      };
    } catch (error) {
      isLoading.value = false
      return {
        success: false,
        message: error.response.data.message,
        error: error.response.data.errors,
        generalError: error
      };
    }
  };

  const updateComment = async (data, id) => {
      isCommentLoading.value = true
      await new Promise((resolve) => setTimeout(resolve, 1500))
    try {
      const stringifyData = JSON.stringify(data);
      const result = await updateCommentById(stringifyData, id);
      isCommentLoading.value = false
      return {
        success: true,
        message: result.data.message,
      };
    } catch (error) {
      isCommentLoading.value = false
      return {
        success: false,
        message: error.response.data.messagge,
        error: error.response.data.error,
      };
    }
  };
  const deleteComment = async (id) => {
    try {
      const result = await deleteCommentById(id);
      commentsList.value = commentsList.value.filter((com) => com.id !== id);
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
    editBlogPostById,
    deleteComment,
  };
});

export default useBlogStore;

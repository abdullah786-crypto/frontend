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

  const addBlogPosts = async (data) => {
    try {
      const result = await postAllBlogs(data);
      return {
        success: true,
        message: result.data.message,
      };
    } catch (error) {
      console.log('error is', error);
      return {
        success: false,
        message: error.response.data.message,
        errors: error.response.data.errors.map((err) =>
          err.errors.map((err) => err),
        ),
      };
    }
  };

  const getBlogPosts = async () => {
    posts.value = await getAllBlogs()
      .then((result) => {
        console.log('bbbbbbbbb', result);

        return result.data.blogs;
      })
      .catch((err) => {
        return err;
      });
    console.log('====================================');
    console.log(posts.value);
    console.log('====================================');
  };

  const getBlogPostsById = async (postId) => {
    blog.value = await getBlogById(postId)
      .then((result) => {
        console.log('value of the result is ', result.blogs);
        return result.data.blogs;
      })
      .catch((err) => {
        return err;
      });
    console.log('vblog.cas ', blog.value);

    // const stored = localStorage.getItem('blogsList');
    // if (stored) {
    //   const parsedPosts = JSON.parse(stored);
    //   console.log('parsed posts', parsedPosts);
    //   const post = parsedPosts.find((p) => Number(p.id) === Number(postId));
    //   return post;
    // }
    // return null;
  };
  const postComment = async (data, blogId) => {
    try {
      const result = await addComments(data, blogId);
      console.log('result while posting comment', result);
      if (result.status === 200) {
        return {
          success: true,
          message: result.data.message,
        };
      }
    } catch (error) {
      console.log('error while posting comment', error);
      return {
        success: false,
        message: error.response.data.messagge,
        errors: error.response.data.error.map((err) => err.error.map((e) => e)),
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
      console.log('error in catch is', error.response.data.errors.map((err) => err.error.map((e) => e)));

      return {
        success: false,
        message: error.response.data.message,
        error: error.response.data.errors.map((err) => err.error.map((e) => e))
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
      console.log('error', error);

      return {
        success: false,
        error: error.response.data.error.map((error) => ({
          error: error.error.map((err) => err),
        })),
      };
    }
  };

  const deleteComment = async (id) => {
    try {
      const result = await deleteCommentById(id);
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

  return {
    editorValue,
    posts,
    name,
    email,
    comment,
    commentsObject,
    commentsList,
    addBlogPosts,
    getBlogPosts,
    getBlogPostsById,
    postComment,
    updateComment,
    editPostById,
    deleteComment,
    blog,
  };
});

export default useBlogStore;

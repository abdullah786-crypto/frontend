import http from './httpServices/httpService';

export const getAllBlogs = async (title, subtitle, page, limit) => {
  try {
    return http
      .get(
        `/blog/?title=${title}&subtitle=${subtitle}&page=${page}&limit=${limit}`)
      .then((result) => {
        return result;
      });
  } catch (error) {
    throw error;
  }
};

export const postAllBlogs = async (data) => {
  try {
    const response = await http.post(`/blog`, data, {withCredentials: true});
    return response;
  } catch (error) {
    throw error;
  }
};

export const addComments = async (data, blogId) => {
  try {
    const response = await http.post(
      `/comments/blogId=${blogId}`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    return await http
      .get(`/blog/id=${id}`)
      .then((result) => {
        return result;
      });
  } catch (error) {
    throw error;
  }
};

export const updateCommentById = async (data, id) => {
  return await http
    .put(`/comments/commentId=${id}`, data)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteCommentById = async (id) => {
  return await http
    .delete(`/comments/commentId=${id}`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export const updateBlogById = async (data, id) => {
  try {
    const respose = await http.put(`/blog/id=${id}`, data, {withCredentials: true});
    return respose;
  } catch (error) {
    throw error;
  }
};


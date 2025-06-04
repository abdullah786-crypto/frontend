import axios from 'axios';

export const baseUrl = 'http://localhost:3000/api';

export const getAllBlogs = async (title, subtitle, page, limit) => {
  try {
    return axios
      .get(
        `${baseUrl}/blog/?title=${title}&subtitle=${subtitle}&page=${page}&limit=${limit}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((result) => {
        return result;
      });
  } catch (error) {
    throw error;
  }
};

export const postAllBlogs = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/blog`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('value of the response is', response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addComments = async (data, blogId) => {
  try {
    const response = await axios.post(
      `${baseUrl}/comments/blogId=${blogId}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('response', response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    return await axios
      .get(`${baseUrl}/blog/id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        return result;
      });
  } catch (error) {
    throw error;
  }
};

export const updateCommentById = async (data, id) => {
  return await axios
    .put(`${baseUrl}/comments/commentId=${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteCommentById = async (id) => {
  return await axios
    .delete(`${baseUrl}/comments/commentId=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export const updateBlogById = async (data, id) => {
  try {
    const respose = await axios.put(`${baseUrl}/blog/id=${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return respose;
  } catch (error) {
    throw error;
  }
};

export const searchQuery = async (title, subtitle) => {
  return await axios
    .get(`${baseUrl}/blog/search?title=${title}&subtitle=${subtitle}`)
    .then((result) => {
      console.log;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

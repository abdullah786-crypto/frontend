import http from '../httpServices/httpService';

export const loginUser = async (username, password) => {
  let userCredentials = {
    username: username,
    password: password,
  };
  return await http.post(`/auth/login`, userCredentials);
};

export const signupUser = async (username, password) => {
  let userCredentials = {
    username: username,
    password: password,
  };
  return await http.post('/auth/signup', userCredentials);
};

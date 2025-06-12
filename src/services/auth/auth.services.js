import http from '../httpServices/httpService';

export const loginUser = async (username, password) => {
  let userCredentials = {
    username: username,
    password: password,
  };
  return await http.post(`/auth/login`, userCredentials, {withCredentials: true});
};

export const signupUser = async (username, password) => {
  let userCredentials = {
    username: username,
    password: password,
  };
  return await http.post('/auth/signup', userCredentials);
};


export const checkSession = async () => {
  try {
      const response = await http.get('/auth/check-session')
      return response
  } catch (error) {
      console.log('error is', error)
      return error
  }
}

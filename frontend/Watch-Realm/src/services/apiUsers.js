import { api } from './api';

export async function getUser() {
  try {
    const { data } = await api.get(`/users/me`);
    return data?.data;
  } catch (error) {
    // console.error('Error fetching user:', error.response || error.message);
    throw new Error(error?.response?.data?.message);
  }
}

export async function updateUser(user) {
  const { name, photo } = user;
  try {
    const { data } = await api.patch(
      `/users/updateMe`,
      {
        name,
        photo,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data?.data;
  } catch (error) {
    // console.error('Error updating user:', error.response || error.message);
    throw new Error(error?.response?.data?.message);
  }
}

export async function updatePassword(user) {
  const { passwordCurrent, password, passwordConfirm } = user;
  try {
    const { data } = await api.patch(`/users/updateMyPassword`, {
      passwordCurrent,
      password,
      passwordConfirm,
    });
    const token = data.token;
    localStorage.setItem('token', token);
    return data?.data;
  } catch (error) {
    // console.error('Error updating password:', error.response || error.message);
    throw new Error(error?.response?.data?.message);
  }
}

export async function signup(user) {
  try {
    const { name, email, password, passwordConfirm } = user;
    const { data } = await api.post('/users/signup', {
      name,
      email,
      password,
      passwordConfirm,
    });
    return data?.data;
  } catch (error) {
    // console.error(error.response?.data);
    throw new Error(error?.response?.data?.message || 'Failed to sign up');
  }
}

export async function login(user) {
  try {
    const { email, password } = user;
    const { data } = await api.post('/users/login', {
      email,
      password,
    });

    localStorage.setItem('token', data?.token);
    return data?.data;
  } catch (error) {
    // console.error('Error fetching user:', error.response || error.message);
    throw new Error(error?.response?.data?.message || 'Failed to login');
  }
}

export async function logout() {
  try {
    const { data } = await api.get('/users/logout');
    localStorage.removeItem('token');
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Error logging out');
  }
}

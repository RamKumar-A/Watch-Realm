import { url } from './api';

export async function getUser() {
  try {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      throw new Error('No token found. Please log in.');
    }
    const { data } = await url.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return data?.data;
  } catch (error) {
    console.error('Error fetching user:', error.response || error.message);
    throw new Error(error?.response?.data?.message);
  }
}

export async function updateUser(user) {
  const { name, photo } = user;
  try {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      throw new Error('No token found. Please log in.');
    }
    const { data } = await url.patch(
      `/users/updateMe`,
      {
        name,
        photo,
      },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data?.data;
  } catch (error) {
    console.error('Error updating user:', error.response || error.message);
    throw new Error(error?.response?.data?.message);
  }
}

export async function updatePassword(user) {
  const { passwordCurrent, password, passwordConfirm } = user;
  try {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      throw new Error('No token found. Please log in.');
    }
    const { data } = await url.patch(
      `/users/updateMyPassword`,
      {
        passwordCurrent,
        password,
        passwordConfirm,
      },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    const token = data.token;
    localStorage.setItem('token', token);
    return data?.data;
  } catch (error) {
    console.error('Error updating password:', error.response || error.message);
    throw new Error(error?.response?.data?.message);
  }
}

export async function signup(user) {
  try {
    const { name, email, password, passwordConfirm } = user;
    const { data } = await url.post('/users/signup', {
      name,
      email,
      password,
      passwordConfirm,
    });
    return data?.data;
  } catch (error) {
    console.error(error.response?.data);
    throw new Error(error?.response?.data?.message || 'Failed to sign up');
  }
}

export async function login(user) {
  try {
    const { email, password } = user;
    const { data } = await url.post('/users/login', {
      email,
      password,
    });

    const token = data?.token;
    localStorage.setItem('token', token);
    return data?.data;
  } catch (error) {
    console.error('Error fetching user:', error.response || error.message);
    throw new Error(error?.response?.data?.message || 'Failed to login');
  }
}

export async function logout() {
  try {
    const storedToken = localStorage.getItem('token');
    // console.log(token);
    if (!storedToken) {
      throw new Error('No token found. Please log in.');
    }
    const { data } = await url.get('/users/logout', {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    localStorage.removeItem('token');
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Error logging out');
  }
}

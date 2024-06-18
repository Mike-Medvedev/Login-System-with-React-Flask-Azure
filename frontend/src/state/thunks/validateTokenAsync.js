import { createAsyncThunk } from '@reduxjs/toolkit';

export const validateTokenAsync = createAsyncThunk('auth/validateTokenAsync', async () => {
  try {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      throw new Error('No access token found');
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    };

    const response = await fetch('https://flask-login-server.azurewebsites.net/verify', options);

    if (response.ok) {
      console.log('verification is good');
      return true;
    } else {
      throw new Error('Error verifying token');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

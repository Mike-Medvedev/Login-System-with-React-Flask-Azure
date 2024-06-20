export async function loginLoader() {
  try {
    const user_id = await fetch('https://flask-login-server.azurewebsites.net/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    const user_data = await user_id.json();
    const guitars = await fetch('https://flask-login-server.azurewebsites.net/guitars', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    const guitar_data = await guitars.json();
    console.log(guitar_data);
    return { user_data: user_data, guitar_data: guitar_data };
  } catch (error) {
    console.error('login loader error fetching', error);
    return {};
  }
}

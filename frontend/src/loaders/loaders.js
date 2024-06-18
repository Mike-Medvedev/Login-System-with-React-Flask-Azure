export async function loginLoader() {
  try {
    const response = await fetch('https://flask-login-server.azurewebsites.net');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('login loader error fetching');
    return {};
  }
}

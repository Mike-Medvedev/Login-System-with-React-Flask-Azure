export async function loginLoader() {
  try {
    const response = await fetch('http://localhost:5000');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('login loader error fetching');
    return {};
  }
}

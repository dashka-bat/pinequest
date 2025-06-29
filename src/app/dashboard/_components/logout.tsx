export async function logout() {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', 
    });

    const data = await res.json();

    if (data.success) {
      console.log('Logout successful');
      window.location.href = '/';
    } else {
      console.error('Logout failed:', data.message);
    }
  } catch (err) {
    console.error('Error during logout:', err);
  }
}

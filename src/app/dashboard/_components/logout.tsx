'use client';

export const logout = async () => {
  await fetch('/api/log-out', {
    method: 'POST',
  });
  window.location.href = '/';
};

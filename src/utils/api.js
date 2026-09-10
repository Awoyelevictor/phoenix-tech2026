// Use relative URL so it works on both localhost and production (Render)
// When served from Express, /api calls go to the same server
const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

// --- Auth Token Management ---
export const getAdminToken = () => {
  return sessionStorage.getItem('admin_token') || '';
};

export const setAdminToken = (token) => {
  if (token) {
    sessionStorage.setItem('admin_token', token);
  } else {
    sessionStorage.removeItem('admin_token');
  }
};

const getAuthHeaders = (extraHeaders = {}) => {
  const token = getAdminToken();
  return {
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...extraHeaders,
  };
};

// --- Contact & Messages ---
export const sendContactMessage = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to send message');
  return data;
};

export const getMessages = async () => {
  const response = await fetch(`${API_BASE_URL}/contact/messages`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to fetch messages');
  }
  return await response.json();
};

export const markMessageRead = async (id) => {
  const response = await fetch(`${API_BASE_URL}/contact/messages/${id}/read`, {
    method: 'PUT',
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update message');
  }
  return await response.json();
};

export const deleteMessage = async (id) => {
  const response = await fetch(`${API_BASE_URL}/contact/messages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete message');
  }
  return await response.json();
};

// --- Analytics ---
export const recordPageView = async (countryCode = 'Unknown') => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ countryCode })
    });
    return await response.json();
  } catch (error) {
    console.debug('Analytics offline/local:', error);
    return null;
  }
};

export const getAnalytics = async () => {
  const response = await fetch(`${API_BASE_URL}/analytics`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch analytics');
  return await response.json();
};

// --- Site Content ---
export const getSiteContent = async () => {
  const response = await fetch(`${API_BASE_URL}/content`);
  if (!response.ok) throw new Error('Failed to fetch content');
  return await response.json();
};

export const updateSiteContent = async (contentData) => {
  const response = await fetch(`${API_BASE_URL}/content`, {
    method: 'PUT',
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(contentData),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update site content');
  }
  return await response.json();
};

// --- Projects ---
export const getProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return await response.json();
};

export const createProject = async (projectData) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(projectData),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create project');
  }
  return await response.json();
};

export const updateProject = async (id, projectData) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(projectData),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update project');
  }
  return await response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete project');
  }
  return await response.json();
};

// --- Admin Auth ---
export const adminLogin = async (password) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Authentication failed');
  if (data.token) {
    setAdminToken(data.token);
  }
  return data;
};

export const adminLogout = () => {
  setAdminToken(null);
  sessionStorage.removeItem('admin_auth');
};

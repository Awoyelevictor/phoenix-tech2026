// Use relative URL so it works on both localhost and production (Render)
// When served from Express, /api calls go to the same server
// In Vite dev, vite.config.js proxies /api to http://localhost:5001
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

// Safe JSON parser to handle non-JSON / HTML / offline responses gracefully
const safeJsonParse = async (response) => {
  try {
    return await response.json();
  } catch (e) {
    if (!response.ok) {
      throw new Error(`Server error ${response.status} (${response.statusText || 'Not Found'}). Is the backend running on port 5001?`);
    }
    throw new Error('Unexpected non-JSON response from server.');
  }
};

// --- Contact & Messages ---
export const sendContactMessage = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await safeJsonParse(response);
  if (!response.ok) throw new Error(data.error || 'Failed to send message');
  return data;
};

export const getMessages = async () => {
  const response = await fetch(`${API_BASE_URL}/contact/messages`, {
    headers: getAuthHeaders()
  });
  const data = await safeJsonParse(response);
  if (!response.ok) throw new Error(data.error || 'Failed to fetch messages');
  return data;
};

export const markMessageRead = async (id) => {
  const response = await fetch(`${API_BASE_URL}/contact/messages/${id}/read`, {
    method: 'PUT',
    headers: getAuthHeaders()
  });
  const data = await safeJsonParse(response);
  if (!response.ok) throw new Error(data.error || 'Failed to update message');
  return data;
};

export const deleteMessage = async (id) => {
  const response = await fetch(`${API_BASE_URL}/contact/messages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await safeJsonParse(response);
  if (!response.ok) throw new Error(data.error || 'Failed to delete message');
  return data;
};

// --- Analytics ---
export const recordPageView = async (countryCode = 'Unknown') => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ countryCode })
    });
    return await safeJsonParse(response);
  } catch (error) {
    console.debug('Analytics offline/local:', error);
    return null;
  }
};

export const getAnalytics = async () => {
  const response = await fetch(`${API_BASE_URL}/analytics`, {
    headers: getAuthHeaders()
  });
  const data = await safeJsonParse(response);
  if (!response.ok) throw new Error(data.error || 'Failed to fetch analytics');
  return data;
};

// --- Site Content ---
export const getSiteContent = async () => {
  const response = await fetch(`${API_BASE_URL}/content`);
  const data = await safeJsonParse(response);
  if (!response.ok) throw new Error(data.error || 'Failed to fetch content');
  return data;
};

export const updateSiteContent = async (contentData) => {
  const response = await fetch(`${API_BASE_URL}/content`, {
    method: 'PUT',
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(contentData),
  });
  const data = await safeJsonParse(response);
  if (!response.ok) throw new Error(data.error || 'Failed to update site content');
  return data;
};

// --- Projects ---
export const getProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  const data = await safeJsonParse(response);
  if (!response.ok) throw new Error(data.error || 'Failed to fetch projects');
  return data;
};

export const createProject = async (projectData) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(projectData),
  });
  const data = await safeJsonParse(response);
  if (!response.ok) throw new Error(data.error || 'Failed to create project');
  return data;
};

export const updateProject = async (id, projectData) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(projectData),
  });
  const data = await safeJsonParse(response);
  if (!response.ok) throw new Error(data.error || 'Failed to update project');
  return data;
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await safeJsonParse(response);
  if (!response.ok) throw new Error(data.error || 'Failed to delete project');
  return data;
};

// --- Admin Auth ---
export const adminLogin = async (password) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = await safeJsonParse(response);
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

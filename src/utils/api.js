const API_BASE_URL = 'http://localhost:5000/api';

// --- Contact & Messages ---
export const sendContactMessage = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error('Failed to send message');
  return await response.json();
};

export const getMessages = async () => {
  const response = await fetch(`${API_BASE_URL}/contact/messages`);
  if (!response.ok) throw new Error('Failed to fetch messages');
  return await response.json();
};

export const markMessageRead = async (id) => {
  const response = await fetch(`${API_BASE_URL}/contact/messages/${id}/read`, {
    method: 'PUT'
  });
  return await response.json();
};

export const deleteMessage = async (id) => {
  const response = await fetch(`${API_BASE_URL}/contact/messages/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
};

// --- Analytics ---
export const recordPageView = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/view`, {
      method: 'POST'
    });
    return await response.json();
  } catch (error) {
    console.debug('Analytics offline/local:', error);
    return null;
  }
};

export const getAnalytics = async () => {
  const response = await fetch(`${API_BASE_URL}/analytics`);
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contentData),
  });
  if (!response.ok) throw new Error('Failed to update content');
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) throw new Error('Failed to create project');
  return await response.json();
};

export const updateProject = async (id, projectData) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return await response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete project');
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
  return data;
};

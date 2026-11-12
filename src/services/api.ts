// Comprehensive API client for MadanCo Corporate Platform & CMS

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('madanco_auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...((options.headers as Record<string, string>) || {}),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({ success: false, message: 'خطا در ارتباط با سرور' }));

  if (!response.ok) {
    if (response.status === 401 && !endpoint.includes('/auth/login')) {
      localStorage.removeItem('madanco_auth_token');
      localStorage.removeItem('madanco_auth_user');
      window.dispatchEvent(new Event('auth_state_changed'));
    }
    throw new Error(data.message || 'خطا در اجرای عملیات.');
  }

  return data;
}

export const api = {
  // Auth
  auth: {
    login: (body: { username: string; password: string }) =>
      request<{ success: boolean; token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    getMe: () => request<{ success: boolean; user: any }>('/auth/me'),
    changePassword: (body: { current_password: string; new_password: string }) =>
      request<{ success: boolean; message: string }>('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },

  // Pages
  pages: {
    getAll: () => request<{ success: boolean; data: any[] }>('/pages'),
    getBySlug: (slug: string) => request<{ success: boolean; data: any }>(`/pages/slug/${slug}`),
    getById: (id: number | string) => request<{ success: boolean; data: any }>(`/pages/${id}`),
    create: (data: any) =>
      request<{ success: boolean; message: string; id: number }>('/pages', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number | string, data: any) =>
      request<{ success: boolean; message: string }>(`/pages/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number | string) =>
      request<{ success: boolean; message: string }>(`/pages/${id}`, {
        method: 'DELETE',
      }),
  },

  // Articles & Blog
  articles: {
    getPublic: (params?: { category?: string; tag?: string; search?: string; page?: number; limit?: number }) => {
      const q = new URLSearchParams();
      if (params?.category) q.set('category', params.category);
      if (params?.tag) q.set('tag', params.tag);
      if (params?.search) q.set('search', params.search);
      if (params?.page) q.set('page', String(params.page));
      if (params?.limit) q.set('limit', String(params.limit));
      return request<{ success: boolean; data: any[]; pagination: any }>(`/articles/public?${q.toString()}`);
    },
    getPublicBySlug: (slug: string) => request<{ success: boolean; data: any }>(`/articles/public/${slug}`),
    getAll: () => request<{ success: boolean; data: any[] }>('/articles'),
    getById: (id: number | string) => request<{ success: boolean; data: any }>(`/articles/${id}`),
    create: (data: any) =>
      request<{ success: boolean; message: string; id: number }>('/articles', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number | string, data: any) =>
      request<{ success: boolean; message: string }>(`/articles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number | string) =>
      request<{ success: boolean; message: string }>(`/articles/${id}`, {
        method: 'DELETE',
      }),
  },

  // Categories
  categories: {
    getAll: () => request<{ success: boolean; data: any[] }>('/categories'),
    create: (data: { name: string; slug: string; description?: string }) =>
      request<{ success: boolean; message: string; id: number }>('/categories', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number | string, data: any) =>
      request<{ success: boolean; message: string }>(`/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number | string) =>
      request<{ success: boolean; message: string }>(`/categories/${id}`, {
        method: 'DELETE',
      }),
  },

  // Media
  media: {
    getAll: (params?: { search?: string; type?: string }) => {
      const q = new URLSearchParams();
      if (params?.search) q.set('search', params.search);
      if (params?.type) q.set('type', params.type);
      return request<{ success: boolean; data: any[] }>(`/media?${q.toString()}`);
    },
    upload: async (file: File, altText?: string, title?: string) => {
      const formData = new FormData();
      formData.append('file', file);
      if (altText) formData.append('alt_text', altText);
      if (title) formData.append('title', title);

      const token = localStorage.getItem('madanco_auth_token');
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch(`${API_BASE}/media/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'خطا در آپلود فایل');
      return data;
    },
    update: (id: number | string, data: { alt_text?: string; title?: string }) =>
      request<{ success: boolean; message: string }>(`/media/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number | string) =>
      request<{ success: boolean; message: string }>(`/media/${id}`, {
        method: 'DELETE',
      }),
  },

  // Settings
  settings: {
    getPublic: () => request<{ success: boolean; data: Record<string, string> }>('/settings/public'),
    getAll: () => request<{ success: boolean; data: Record<string, Record<string, string>> }>('/settings'),
    update: (settings: Record<string, string>) =>
      request<{ success: boolean; message: string }>('/settings/batch', {
        method: 'POST',
        body: JSON.stringify(settings),
      }),
  },

  // Messages & Inquiries
  messages: {
    submit: (data: { name: string; email?: string; phone?: string; company?: string; subject?: string; message: string }) =>
      request<{ success: boolean; message: string; id: number }>('/messages/submit', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getAll: (params?: { status?: string; search?: string; page?: number; limit?: number }) => {
      const q = new URLSearchParams();
      if (params?.status) q.set('status', params.status);
      if (params?.search) q.set('search', params.search);
      if (params?.page) q.set('page', String(params.page));
      if (params?.limit) q.set('limit', String(params.limit));
      return request<{ success: boolean; data: any[]; unreadCount: number; pagination: any }>(`/messages?${q.toString()}`);
    },
    getById: (id: number | string) => request<{ success: boolean; data: any }>(`/messages/${id}`),
    updateStatus: (id: number | string, status: string) =>
      request<{ success: boolean; message: string }>(`/messages/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    addNote: (id: number | string, note: string) =>
      request<{ success: boolean; message: string }>(`/messages/${id}/notes`, {
        method: 'POST',
        body: JSON.stringify({ note }),
      }),
    delete: (id: number | string) =>
      request<{ success: boolean; message: string }>(`/messages/${id}`, {
        method: 'DELETE',
      }),
  },

  // SEO
  seo: {
    getOverview: () => request<{ success: boolean; stats: any; items: any[] }>('/seo/overview'),
  },

  // Users & Audit
  users: {
    getAll: () => request<{ success: boolean; data: any[] }>('/users'),
    create: (data: any) =>
      request<{ success: boolean; message: string; id: number }>('/users', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number | string, data: any) =>
      request<{ success: boolean; message: string }>(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number | string) =>
      request<{ success: boolean; message: string }>(`/users/${id}`, {
        method: 'DELETE',
      }),
    getAuditLogs: () => request<{ success: boolean; data: any[] }>('/users/audit-logs'),
  },
};

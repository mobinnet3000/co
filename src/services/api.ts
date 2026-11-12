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

  // Dynamic Page Sections & Page Builder
  sections: {
    getByPageSlug: (slug: string) =>
      request<{ success: boolean; page: any; data: Array<{ id: number; section_type: string; section_order: number; config: any; is_active: number }> }>(
        `/sections/public/slug/${slug}`
      ),
    getByPageId: (pageId: number | string) =>
      request<{ success: boolean; data: Array<{ id: number; section_type: string; section_order: number; config: any; is_active: number }> }>(
        `/sections/page/${pageId}`
      ),
    create: (pageId: number | string, data: { section_type: string; config_json: string | object; is_active?: number; section_order?: number }) =>
      request<{ success: boolean; message: string; id: number }>(`/sections/page/${pageId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number | string, data: { section_type?: string; config_json?: string | object; is_active?: number; section_order?: number }) =>
      request<{ success: boolean; message: string }>(`/sections/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number | string) =>
      request<{ success: boolean; message: string }>(`/sections/${id}`, {
        method: 'DELETE',
      }),
    reorder: (pageId: number | string, items: Array<{ id: number; section_order: number }>) =>
      request<{ success: boolean; message: string }>(`/sections/page/${pageId}/reorder`, {
        method: 'POST',
        body: JSON.stringify({ items }),
      }),
    duplicate: (id: number | string) =>
      request<{ success: boolean; message: string; id: number }>(`/sections/${id}/duplicate`, {
        method: 'POST',
      }),
  },

  // Navigation Menus
  menus: {
    getPublicBySlug: (slug: string) =>
      request<{ success: boolean; menu: any; items: any[] }>(`/menus/public/${slug}`),
    getAllPublic: () =>
      request<{ success: boolean; data: Record<string, { id: number; name: string; slug: string; items: any[] }> }>('/menus/public/all'),
    getAll: () =>
      request<{ success: boolean; data: Array<{ id: number; name: string; slug: string; location: string; item_count: number }> }>('/menus'),
    getById: (id: number | string) =>
      request<{ success: boolean; menu: any; itemsFlat: any[]; itemsTree: any[] }>(`/menus/${id}`),
    create: (data: { name: string; slug: string; location?: string }) =>
      request<{ success: boolean; message: string; id: number }>('/menus', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number | string, data: { name?: string; location?: string }) =>
      request<{ success: boolean; message: string }>(`/menus/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number | string) =>
      request<{ success: boolean; message: string }>(`/menus/${id}`, {
        method: 'DELETE',
      }),
    addItem: (menuId: number | string, data: { title: string; url: string; parent_id?: number | null; sort_order?: number; target?: string; is_active?: number }) =>
      request<{ success: boolean; message: string; id: number }>(`/menus/${menuId}/items`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateItem: (itemId: number | string, data: { title?: string; url?: string; parent_id?: number | null; sort_order?: number; target?: string; is_active?: number }) =>
      request<{ success: boolean; message: string }>(`/menus/items/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteItem: (itemId: number | string) =>
      request<{ success: boolean; message: string }>(`/menus/items/${itemId}`, {
        method: 'DELETE',
      }),
    reorderItems: (menuId: number | string, items: Array<{ id: number; sort_order: number; parent_id?: number | null }>) =>
      request<{ success: boolean; message: string }>(`/menus/${menuId}/items/reorder`, {
        method: 'POST',
        body: JSON.stringify({ items }),
      }),
  },

  // Analytics
  analytics: {
    track: (data: { event_type?: string; path: string; referrer?: string }) =>
      request<{ success: boolean }>('/analytics/collect', {
        method: 'POST',
        body: JSON.stringify(data),
      }).catch(() => ({ success: false })),
    getDashboard: () =>
      request<{
        success: boolean;
        stats: {
          totalViews: number;
          todayViews: number;
          uniqueVisitors: number;
          totalArticles: number;
          draftArticles: number;
          totalPages: number;
          totalMedia: number;
          unreadMessages: number;
          totalMessages: number;
        };
        topPaths: Array<{ path: string; views: number }>;
        trends: Array<{ date: string; views: number }>;
        recentLogs: any[];
      }>('/analytics/dashboard'),
  },

  // Admin Global Search
  search: {
    admin: (q: string) =>
      request<{
        success: boolean;
        query: string;
        data: {
          pages: any[];
          articles: any[];
          messages: any[];
          media: any[];
          menus: any[];
        };
      }>(`/search/admin?q=${encodeURIComponent(q)}`),
  },
};

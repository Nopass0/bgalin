import axios from "axios";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const getTestimonials = async () => {
  const response = await api.get("/testimonials");
  return response.data;
};

export const submitContactForm = async (formData: {
  name: string;
  email: string;
  description: string;
  budget?: string;
}) => {
  const response = await api.post("/contact", formData);
  return response.data;
};

export const loginAdmin = async (code: string) => {
  const response = await api.post("/admin/login", { code });
  return response.data;
};

export const getAdminProjects = async () => {
  const response = await api.get("/admin/projects", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  return response.data;
};

export const createProject = async (projectData: {
  name: string;
  description: string;
  imageUrl: string;
  url: string;
}) => {
  const response = await api.post("/admin/projects", projectData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  return response.data;
};

export const updateProject = async (
  id: string,
  projectData: {
    name: string;
    description: string;
    imageUrl: string;
    url: string;
  }
) => {
  const response = await api.put(`/admin/projects/${id}`, projectData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  return response.data;
};

export const deleteProject = async (id: string) => {
  const response = await api.delete(`/admin/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  return response.data;
};

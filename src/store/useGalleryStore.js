import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useGalleryStore = create((set, get) => ({
  projects: [],
  categories: [],
  isFetchingCategories: false,
  projectForEdit: null,
  isFetcinghProjectForEdit: false,
  isFetching: false,
  isUploading: false,
  isUpdating: false,
  isDeleting: false,
  isCreatingCategory: false,
  isDeletingCategory: false,

  fetchAllProjects: async () => {
    set({ isFetching: true });
    try {
      const res = await axiosInstance.get("/gallery/all-projects");
      const projects = res.data;
      set({ projects });
    } catch (error) {
      console.log("Error in fetching projects", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isFetching: false });
    }
  },

  uploadProject: async (data) => {
    set({ isUploading: true });
    try {
      const res = await axiosInstance.post("/gallery/upload-project", data);
      const project = res.data;
      set({ projects: [...get().projects, project] });
      toast.success("Project uploaded successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log("Error in uploading project", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isUploading: false });
    }
  },
  fetchProjectForEdit: async (id) => {
    set({ isFetcinghProjectForEdit: true });
    try {
      const res = await axiosInstance.get(`/gallery/project-for-edit/${id}`);
      const project = res.data;
      set({ projectForEdit: project });
    } catch (error) {
      console.log("Error in fetching project for edit", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isFetcinghProjectForEdit: false });
    }
  },

  updateProject: async (id, data) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put(`/gallery/edit-project/${id}`, data);
      const project = res.data;
      set({
        projects: get().projects.map((p) => (p._id === id ? project : p)),
      });
      document.getElementById("editModal").close();
      toast.success("Project updated successfully");
    } catch (error) {
      console.log("Error in updating project", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isUpdating: false });
    }
  },

  getAllCategories: async () => {
    set({ isFetchingCategories: true });
    try {
      const res = await axiosInstance.get("/gallery/all-categories");
      const categories = res.data;
      set({ categories });
    } catch (error) {
      console.log("Error in fetching categories", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isFetchingCategories: false });
    }
  },

  createCategory: async (name) => {
    set({ isCreatingCategory: true });
    try {
      const res = await axiosInstance.post("/gallery/upload-category", {
        name,
      });
      const category = res.data;
      set({ categories: [...get().categories, category] });
      toast.success("Category created successfully");
    } catch (error) {
      console.log("Error in creating category", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isCreatingCategory: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isDeletingCategory: true });
    try {
      const res = await axiosInstance.delete(`/gallery/delete-category/${id}`);
      set({ categories: get().categories.filter((c) => c._id !== id) });
      toast.success("Category deleted successfully");
    } catch (error) {
      console.log("Error in deleting category", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isDeletingCategory: false });
    }
  },

  deleteProject: async (id) => {
    set({ isDeleting: true });
    try {
      const res = await axiosInstance.delete(`/gallery/delete-project/${id}`);
      set({ projects: get().projects.filter((p) => p._id !== id) });
      toast.success("Project deleted successfully");
    } catch (error) {
      console.log("Error in deleting project", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isDeleting: false });
    }
  },
}));

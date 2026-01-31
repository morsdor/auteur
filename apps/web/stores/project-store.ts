import { create } from 'zustand';
import type { Project } from '@auteur/types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;

  // Actions
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  clearProjects: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,

  setProjects: (projects) => set({ projects }),

  setCurrentProject: (project) => set({ currentProject: project }),

  addProject: (project) =>
    set((state) => ({
      projects: [project, ...state.projects],
    })),

  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      currentProject:
        state.currentProject?.id === id
          ? { ...state.currentProject, ...updates }
          : state.currentProject,
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      currentProject: state.currentProject?.id === id ? null : state.currentProject,
    })),

  clearProjects: () =>
    set({
      projects: [],
      currentProject: null,
    }),
}));

import { defineStore } from "pinia";
import axios from "axios";
export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    counter: 0,
    timerInHours: 0,
    projects: [],
    projectStatus: false,
  }),
  getters: {
    getTimer: (state) => {
      return state.timerInHours;
    },
    getAllProjects: (state) => {
      return state.projects;
    },
    getInProgress: (state) => {
      return state.projects.filter((e) => e.inProgress === true);
    },
    getProjectStatus: (state) => {
      return state.projectStatus;
    },
  },
  actions: {
    increment() {
      this.counter++;
    },
    startProjectTimer(project) {
      //At Timer start change project inprogress
      this.projects.forEach((p) => {
        if (p.id === project.id) {
          if (p.inProgress === false) {
            axios.patch(`http://localhost:3030/projects/${p.id}`, {
              inProgress: true,
            });
          }
        }
      });
    },
    stopProjectTimer(project) {
      // At Timer Stop add work hours and change inprogress state
      this.projects.forEach((p) => {
        if (p.id === project.id) {
          axios.patch(`http://localhost:3030/projects/${p.id}`, p);
        }
      });
    },
    updateProjectMilli(project) {
      // When page is refreshed during timer update timer diff to db
      this.getProjects();
      this.projects.forEach((p) => {
        if (p.id === project.id) {
          axios.patch(`http://localhost:3030/projects/${p.id}`, {
            currentDiffinMilli: project.currentDiffinMilli,
          });
        }
      });
    },
    getProjectInMilli(project) {
      this.getProjects();
      this.projects.forEach((x) => {
        if (x.id === project.id) {
          if (x.inProgress === true) {
            return x.currentDiffinMilli;
          }
        }
      });
    },
    async getProjects() {
      const data = await axios.get("http://localhost:3030/projects");
      this.projects = data.data;
      this.projects.forEach((e) => {
        if (e.inProgress === "true") {
          this.projectStatus = true;
        }
      });
    },
  },
});

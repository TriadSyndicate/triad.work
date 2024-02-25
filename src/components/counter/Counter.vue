<template>
  <div>
    <div>
      <h3>Timer</h3>
    </div>
    <div class="row">
      <div class="btn-group">
        <button v-if="!paused" class="btn" @click="pauseTimer">
          Pause Timer
        </button>
        <button v-else-if="paused" class="btn" @click="resumeTimer">
          Resume Timer
        </button>
        <label v-if="stopped" for="my-modal-4" class="btn text-white bg-sky-500 hover:bg-green-700">Start Timer</label>
        <label v-else-if="!stopped" for="my-modalx" class="btn bg-red-500 hover:bg-red-800">Stop Timer</label>

        <button class="btn" @click="resetTimer">Reset Timer</button>
      </div>
      <br />
    </div>
    <div style="padding-top: 5%">
      <span class="countdown font-mono text-4xl">
        <span :style="'--value:' + timer.hours"></span>h
        <span :style="'--value:' + timer.minutes"></span>m
        <span :style="'--value:' + timer.seconds"></span>s
      </span>
    </div>
    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative">
        <label for="my-modal-4" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <input class="input input-bordered input-secondary w-32 max-w-xs" v-model="timerInput" id="timerInput"
          name="timerInput" type="text" placeholder="2 Hrs" />
        <br>
        <select v-model="projectSelectText" @change="selectP" class="select select-accent w-full max-w-xs">
          <option disabled selected>Project</option>
          <option v-for="p in projects" :key="p.id">{{ p.project }}</option>
        </select>
        <div class="modal-action">
          <label @click="setTimer" for="my-modal-4"
            class="btn text-black bg-lime-500 hover:bg-lime-900 hover:text-white">LETS
            GO!</label>
        </div>
      </div>
    </div>

    <input type="checkbox" id="my-modalx" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">You are now stopping Timer for {{ selectProjectObj.project }}</h3>
        <p class="py-4">Have a Good Day! And Believe!</p>
        <div class="modal-action">
          <label @click="stopTimer" for="my-modalx" class="btn">Yay!</label>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { useCounterStore } from "../../stores/counter";
import { storeToRefs } from "pinia";
</script>
<script>
var xt;
export default {
  data() {
    return {
      countdown: 0,
      timerInput: "",
      timerValue: 0,
      timerStart: 0,
      timerEnd: 0,
      timer: {},
      paused: false,
      stopped: true,
      projects: [],
      selectProjectObj: {},
      projectSelectText: 'Project'
    };
  },
  mounted() {
    const useStore = useCounterStore();
    const { getAllProjects } = storeToRefs(useStore);
    const { getProjects } = useStore;
    getProjects();
    this.projects = getAllProjects;
  },
  methods: {
    resetTimer() {
      clearInterval(xt);
      this.timer = {};
    },
    //Selects project for CRUD
    selectP() {
      this.projects.forEach((e) => {
        if (e.project === this.projectSelectText) {
          this.selectProjectObj = e
        }
      })
    },
    setTimer() {
      var now = Date.now();
      this.stopped = false
      this.timerValue = this.timerInput * 3600000;
      this.timerStart = now;
      this.timerEnd = now + this.timerValue;
      xt = setInterval(() => {
        this.primer();
      }, 100);
    },
    pauseTimer() {
      this.timer.currentDiff = this.timerEnd - Date.now();
      clearInterval(xt);
      this.paused = true;
    },
    resumeTimer() {
      this.timerEnd = Date.now() + this.timer.currentDiff;
      clearInterval(xt);
      xt = setInterval(() => {
        var diff = this.timerEnd - Date.now();
        this.timer.hours = Math.floor(diff / 3600000);
        this.timer.minutes = Math.floor(diff / 1000 / 60) % 60;
        this.timer.seconds = Math.floor(diff / 1000) % 60;
      }, 100);
      this.paused = false;
    },
    primer() {
      this.timer.diff = this.timerEnd - Date.now();
      var diff = this.timer.diff;
      this.timer.hours = Math.floor(diff / 3600000);
      this.timer.minutes = Math.floor(diff / 1000 / 60) % 60;
      this.timer.seconds = Math.floor(diff / 1000) % 60;
      if (diff<0) {
        this.stopTimer()
      }
    },
    loopback(project) {
      this.timer.workMilli = Date.now() - this.timerStart
      const cstore = useCounterStore()
      const { stopProjectTimer } = cstore
      project.workhours = project.workhours + ((this.timer.workMilli) / (1000 * 60 * 60))
      stopProjectTimer(project)
    },
    //Stop Timer and trigger loopback
    stopTimer() {
      this.stopped = true
      this.loopback(this.selectProjectObj)
      this.resetTimer()
    }
  },
};
</script>

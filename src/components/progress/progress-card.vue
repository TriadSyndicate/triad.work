<template>
    <div class="flex-auto card mt-5">
        <p class="text-center text-2xl">Projects WorkHours</p>
        <div v-for="p in projects" :key="p.id">
            <progress v-if="p.workhours > 0" class="progress progress-secondary w-56" :value="p.workhours"
                max="100"></progress>
            <p v-if="p.workhours > 0" class="text-sm text-success">{{ p.project }} <span class="text-sm text-secondary">{{Math.floor(p.workhours)}} Hrs</span> </p>
        </div>
    </div>
</template>
<script setup>
import { useCounterStore } from "../../stores/counter";
import { storeToRefs } from "pinia";
</script>
<script>
export default {
    data() {
        return {
            projects: [],
        };
    },
    mounted() {
        const useStore = useCounterStore();
        const { getAllProjects } = storeToRefs(useStore);
        const { getProjects } = useStore;
        getProjects();
        this.projects = getAllProjects;
    },
};
</script>

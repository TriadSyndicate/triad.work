<template>
    <div>
        <HeaderDash />
        <main>
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <!-- Replace with your content -->
                <div class="flex flex-wrap px-4 py-6 sm:px-0">
                    <div>
                        <NotesVue />
                    </div>
                    <div>
                        <CounterVue />
                    </div>
                    <div>
                        <progressCardVue />
                    </div>
                </div>
                <!-- /End replace -->
            </div>
        </main>
    </div>
</template>

<script>
import HeaderDash from "./header/Header.vue";
import NotesVue from "./sections/notes/Notes.vue";
import CounterVue from "../counter/Counter.vue";
import progressCardVue from "../progress/progress-card.vue";
import { RouterLink, RouterView } from "vue-router";
export default {
    data() {
    },
    components: {
        HeaderDash,
        NotesVue,
        CounterVue,
        progressCardVue,
    }
}
</script>
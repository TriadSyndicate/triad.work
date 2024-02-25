<script setup>
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import { noteStore } from "./stores/notes";
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="50" height="50" />
    <div class="wrapper">
      <h1 class="text-2xl bold underline">Work Dashboard</h1>
      <editorCard />
      <progressCard/>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <a v-for="note in notes" :key="note.title" @click="selectNote(note.id)">{{ note.title }}</a>
      </nav>

    </div>


  </header>
  <RouterView />
</template>

<script>
import { marked } from 'marked'
import editorCard from "./components/editor/editor-card.vue";
import progressCard from "./components/progress/progress-card.vue";
export default {
  data() {
    var cstore = noteStore();
    const { getNotes, noteSelected } = storeToRefs(cstore);
    return {
      noteIndex: 0,
      notes: getNotes,
      counter: getNotes,
      noteContent: noteSelected,
      noteArea: '# Hellow',
    };
  },
  components: {
    editorCard
  },
  computed: {
    markedNote() {
      return marked(this.noteArea)
    }
  },
  mounted() {
    const someStore = noteStore();
    const { fetchNotes } = someStore;
    fetchNotes();
    var interval = setInterval(() => {
      fetchNotes();
    }, 5000);
  },
  methods: {
    selectNote(id) {
      const noteSt = noteStore();
      const { selectNote } = noteSt;
      var c = 0;
      this.notes.forEach((note) => {
        if (note.id === id) {
          this.noteIndex = c;
          this.noteContent = this.notes[this.noteIndex];
          selectNote(this.noteContent);
        }
        c = c + 1;
      });
    },
  },
};
</script>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

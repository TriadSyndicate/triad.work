<template>
    <div>  
        <editorCard />
         <a class="px-1 hover:cursor-pointer text-error hover:text-success" v-for="note in notes" :key="note.title" @click="selectNote(note.id)">{{ note.title }}</a>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { noteStore } from "@/stores/notes";
</script>

<script>
import { marked } from 'marked'
import editorCard from "@/components/editor/editor-card.vue";
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
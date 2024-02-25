<template>
  <div class="flex-auto card">
    <div class="badge badge-secondary">{{ noteAsIs.title }}</div>
    <textarea @focusout="rmEditorUse" @input="setEditorUse" v-model="noteArea"
      class="block textarea textarea-primary w-128 m-4"></textarea>

    <div class="mockup-window border bg-base-300">
      <div class="row">
        <label for="my-modal" class="btn-danger hover:bg-red-700 m-1 p-1">Delete</label>
        <input type="checkbox" id="my-modal" class="modal-toggle" />
        <div class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">
              Are you sure you want to delete {{ noteAsIs.title }}
            </h3>
            <p class="py-4">This is irreversible!</p>
            <div class="modal-action">
              <label @click="deleteNote" for="my-modal" class="btn bg-red-500 hover:bg-red-900">LETS GO!</label>
            </div>
          </div>
        </div>

        <button @click="saveNote" class="bg-blue-500 hover:bg-blue-700 text-white m-1 p-1">
          Save
        </button>
        <label for="my-modal-3" class="bg-sky-500 hover:bg-green-700">New Note</label>
      </div>
      <div class="p-4 bg-base-200" v-html="markedNote"></div>
    </div>
  </div>

  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <input type="text" v-model="newNote.title" placeholder="Note Title"
        class="input input-bordered input-secondary w-full max-w-xs" />
      <input type="text" v-model="newNote.content" placeholder="Note Content"
        class="input input-bordered input-secondary w-full max-w-xs" />
      <div class="modal-action">
        <label @click="addNote" for="my-modal3" class="btn bg-red-500 hover:bg-red-900">LETS GO!</label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { noteStore } from "../../stores/notes";
import { storeToRefs } from 'pinia';
</script>
<script>
import { marked } from "marked";
export default {
  data() {
    return {
      noteArea: '',
      newNote: {},
      noteAsIs: '',
      editorUse: false,
    };
  },
  computed: {
    markedNote() {
      return marked(this.noteArea);
    },
  },
  mounted() {
    const store = noteStore()
    const { noteSelected } = storeToRefs(store)
    this.noteAsIs = noteSelected
    this.noteArea = this.noteAsIs.content
  },
  beforeUpdate() {
    if (!this.editorUse) {
      const store = noteStore()
      const { noteSelected } = storeToRefs(store)
      this.noteAsIs = noteSelected
      this.noteArea = this.noteAsIs.content
    }
  },
  methods: {
    saveNote() {
      const noteSt = noteStore();
      const { editNote } = noteSt;
      this.noteAsIs.content = this.noteArea
      editNote(this.noteAsIs)
    },
    deleteNote() {
      const noteSt = noteStore();
      const { deleteNote } = noteSt;
      deleteNote()
    },
    addNote() {
      const str = noteStore()
      const { addNote } = str
      addNote(this.newNote)
    },
    setEditorUse() {
      this.editorUse = true
    },
    rmEditorUse() {
      this.editorUse = false
    }
  }
};
</script>

<style>
</style>

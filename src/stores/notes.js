import { defineStore } from "pinia";
import axios from "axios";

export const noteStore = defineStore({
  id: "notes",
  state: () => ({
    notes: [{ title: "Some Note 1", content: "Note Data ...." }],
    users: [],
    noteSelected: { id: 3, title: "Some Note 3", content: "Note Datax ...." },
  }),
  getters: {
    getNotes(state) {
      return state.notes;
    },
    getSelectNote(state) {
      return state.noteSelected;
    },
  },
  actions: {
    addNote(note) {
      axios.post('http://localhost:3030/notes', {
        id: this.notes.length + 1,
        title: note.title,
        content: note.content
      })
    },
    deleteNote(){
      axios.delete(`http://localhost:3030/notes/${this.noteSelected.id}`)
    },
    editNote(note){
      axios.patch(`http://localhost:3030/notes/${note.id}`,{
        id: note.id,
        title:note.title,
        content:note.content
      })
    },
    async fetchNotes() {
      const data = await axios.get("http://localhost:3030/notes");
      this.notes = data.data;
    },
    selectNote(note) {
      this.noteSelected = note;
    },
  },
});

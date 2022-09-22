function toggleActive() {
  createNoteFormOpen.classList.toggle("active");
  createNoteForm.classList.toggle("active");
}
function toggleCreateForm(toggleCreateNote) {
  toggleCreateNote.forEach((toggleNote) => toggleNote.addEventListener("click", () => toggleActive()));
}
toggleCreateForm([createNoteFormOpen, createNoteFormClose]);

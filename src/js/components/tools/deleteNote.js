function deleteNoteRender(getNoteId) {
  getNoteId.forEach((noteId) => {
    const id = noteId.dataset.note;
    const deleteNoteBtn = noteId.querySelector("#delete");
    deleteNoteBtn.addEventListener("click", () => {
      notes.splice(id, 1);
      renderNotes();
    });
  });
}

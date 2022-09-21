function archiveNoteRender(getNoteId) {
  const toggleArchive = (toggle, id) => {
    toggle.forEach((note) => {
      note.addEventListener("click", () => {
        notes[id].archived = !notes[id].archived;
        renderNotes();
      });
    });
  };
  getNoteId.forEach((getId) => {
    const id = getId.dataset.note;
    const archiveNote = getId.querySelector("#archive");
    const unarchiveNote = getId.querySelector("#unarchive");
    toggleArchive([archiveNote, unarchiveNote], id);
  });
}

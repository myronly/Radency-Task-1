// Status Notes
function statusNotes(getNoteId) {
  // Get Category
  const getNoteStatus = noteStatus.querySelectorAll("tr");

  // Reset Status
  noteStatus.querySelectorAll(".status").forEach((status) => (status.textContent = 0));

  // Set Status
  getNoteId.forEach((noteId) => {
    const id = noteId.dataset.note;
    const noteCategory = notes[id].category;
    const noteStatus = notes[id].archived;
    getNoteStatus.forEach((getStatus) => {
      const getCategory = getStatus.dataset.category;
      const setStatus = getStatus.querySelector(`${!noteStatus ? ".statusActive" : ".statusArchived"}`);
      if (noteCategory === getCategory) {
        setStatus.textContent = +setStatus.textContent + 1;
        return;
      }
    });
  });
}

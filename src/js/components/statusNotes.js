function statusNotes(getNoteId) {
  const getNoteStatus = noteStatus.querySelectorAll("tr");
  noteStatus.querySelectorAll(".status").forEach((status) => (status.textContent = 0));

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

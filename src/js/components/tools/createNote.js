const createNote = document.querySelector(".add__note");
const createNoteForm = document.querySelector(".create__note-form");
const createNoteFormOpen = document.querySelector(".create__note-btn");
const createNoteFormClose = document.querySelector(".create__note-form .close");

createNote.addEventListener("click", (e) => {
  e.preventDefault();
  const newName = document.querySelector("#newName");
  const newCategory = document.querySelector("#newCategory");
  const newContent = document.querySelector("#newContent");
  const newDates = document.querySelector("#newDates");

  // Browsing Error
  try {
    if (browsingError([newName, newCategory, newContent])) return;
    const newNote = {
      name: newName.value.trim(),
      created: moment().format("ll"),
      category: newCategory.value,
      content: newContent.value.trim(),
      dates: newDates.value,
    };

    createNoteForm.reset();
    notes.push(newNote);
    toggleActive();
    renderNotes();
  } catch (error) {
    console.log(error);
  }
});

// Edit Note
function editNoteRender(getNoteId) {
  const toggleEditSaveNote = (toggleEdit) => {
    toggleEdit.forEach((item) => item.classList.toggle("active"));
  };

  getNoteId.forEach((noteId) => {
    const id = noteId.dataset.note;

    const editNote = noteId.querySelector("#edit");
    const editNoteSave = noteId.querySelector("#save");

    const editName = noteId.querySelector(".noteName");
    const editCategory = noteId.querySelector(".noteCategory");
    const editContent = noteId.querySelector(".noteContent");
    const editDates = noteId.querySelector(".noteDates");

    const lastData = notes[id].dates.split(",").pop().trim();

    editNote.addEventListener("click", () => {
      toggleEditSaveNote([editNote, editNoteSave]);
      editName.innerHTML = `<input value="${notes[id].name}" type="text" placeholder="Name" required />`;
      editCategory.innerHTML = `<select name="category" required>  <option value="" disabled >Category</option>  <option ${notes[id].category === "Task" ? "selected" : false} value="Task">Task</option>  <option ${notes[id].category === "Idea" ? "selected" : false} value="Idea">Idea</option>  <option ${notes[id].category === "Random Thought" ? "selected" : false} value="Random Thought">Random Thought</option>  <option ${notes[id].category === "Quote" ? "selected" : false} value="Quote">Quote</option></select>`;
      editContent.innerHTML = `<input value="${notes[id].content}" type="text" placeholder="Content" required />`;
      editDates.innerHTML = `<input value="${lastData}" type="date" name="date" />`;
    });

    // Save Note
    editNoteSave.addEventListener("click", () => {
      const editNameValue = noteId.querySelector(`.noteName input`);
      const editCategoryValue = noteId.querySelector(`.noteCategory select`);
      const editContentValue = noteId.querySelector(`.noteContent input`);
      const editDatesValue = noteId.querySelector(`.noteDates input`);

      if (browsingError([editNameValue, editCategoryValue, editContentValue])) return;

      notes[id].name = editNameValue.value;
      notes[id].category = editCategoryValue.value;
      notes[id].content = editContentValue.value;

      if (lastData !== editDatesValue.value) notes[id].dates ? (notes[id].dates += ", " + (lastData !== editDatesValue.value ? editDatesValue.value : "")) : (notes[id].dates = editDatesValue.value);

      toggleEditSaveNote([editNote, editNoteSave]);
      renderNotes();
    });
  });
}

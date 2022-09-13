import notes from "./store.js";

// Browsing Error
export const browsingError = (newNoteItems) => {
  for (let newNoteItem of newNoteItems) {
    newNoteItem.classList.remove("trigger");
    newNoteItem.addEventListener("change", () => {
      newNoteItem.classList.remove("trigger");
    });
    if (newNoteItem.value.replace(/\s/g, "") === "") {
      setTimeout(() => newNoteItem.classList.add("trigger"), 4);
      return true;
    }
  }
};

// Edit Note
export const editNoteRender = () => {
  const editNote = document.querySelectorAll("#edit");
  const editNoteSave = document.querySelectorAll("#save");

  const editName = document.querySelectorAll(".noteName");
  const editCategory = document.querySelectorAll(".noteCategory");
  const editContent = document.querySelectorAll(".noteContent");
  const editDates = document.querySelectorAll(".noteDates");

  const toggleEditSaveNote = (toglleEdit) => {
    toglleEdit.forEach((item) => item.classList.toggle("active"));
  };

  for (let i = 0; i < editNote.length; i++) {
    const lastData = notes[i].dates.split(",").pop().trim();
    editNote[i].classList.add("active");
    editNote[i].addEventListener("click", () => {
      toggleEditSaveNote([editNote[i], editNoteSave[i]]);
      editName[i].innerHTML = `<input value="${notes[i].name}" type="text" placeholder="Name" required />`;
      editCategory[i].innerHTML = `<select name="category" required>  <option value="" disabled >Category</option>  <option ${notes[i].category === "Task" ? "selected" : false} value="Task">Task</option>  <option ${notes[i].category === "Idea" ? "selected" : false} value="Idea">Idea</option>  <option ${notes[i].category === "Random Thought" ? "selected" : false} value="Random Thought">Random Thought</option>  <option ${notes[i].category === "Quote" ? "selected" : false} value="Quote">Quote</option></select>`;
      editContent[i].innerHTML = `<input value="${notes[i].content}" type="text" placeholder="Content" required />`;
      editDates[i].innerHTML = `<input value="${lastData}" type="date" name="date" />`;
    });

    editNoteSave[i].addEventListener("click", () => {
      const editNameValue = document.querySelector(`[data-note="${i}"] .noteName input`);
      const editCategoryValue = document.querySelector(`[data-note="${i}"] .noteCategory select`);
      const editContentValue = document.querySelector(`[data-note="${i}"] .noteContent input`);
      const editDatesValue = document.querySelector(`[data-note="${i}"] .noteDates input`);

      if (browsingError([editNameValue, editCategoryValue, editContentValue])) return;

      notes[i].name = editNameValue.value;
      notes[i].category = editCategoryValue.value;
      notes[i].content = editContentValue.value;

      if (lastData !== editDatesValue.value) notes[i].dates ? (notes[i].dates += ", " + (lastData !== editDatesValue.value ? editDatesValue.value : "")) : (notes[i].dates = editDatesValue.value);

      toggleEditSaveNote([editNote[i], editNoteSave[i]]);
      renderNotes();
    });
  }
};

// Archive Note
export const archiveNoteRender = () => {
  const archiveNote = document.querySelectorAll("#archive");
};

// Delete Note
export const deleteNoteRender = () => {
  const deleteNote = document.querySelectorAll("#delete");

  for (let i = 0; i < deleteNote.length; i++) {
    deleteNote[i].addEventListener("click", () => {
      notes.splice(i, 1);
      renderNotes();
    });
  }
};

"use strict";
import notes from "./store.min.js";

// Render 
const noteActive = document.querySelector(".active__notes tbody");
const noteArchive = document.querySelector(".archive__notes tbody");
const noteStatus = document.querySelector(".status__notes tbody");

const getNote = ({ name, created, category, content, dates, archived }, id) =>
  `<tr data-note=${id}>
      <td><div class="img__title"><img width="30" height="30" src="img/categories/${category}.png" alt="${category}" /></div></td>
      <td class="noteName" title="${name}"><span>${name}</span></td>
      <td class="noteCreated"><span>${created}</span></td><td class="noteCategory"><span>${category}</span></td>
      <td class="noteContent" title="${content}"><span>${content}</span></td>
      <td class="noteDates" title="${dates}"><span>${dates}</span></td>
      <td><div class="tools"><div id="save"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32"><title>Save</title><path d="M28 0h-28v32h32v-28l-4-4zM16 4h4v8h-4v-8zM28 28h-24v-24h2v10h18v-10h2.343l1.657 1.657v22.343z"></path></svg></div><div id="edit" class="active"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32"><title>Edit</title><path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path></svg></div><div id="archive" class="${
        !archived ? "active" : null
      }"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32"><title>Archive</title><path d="M26 2h-20l-6 6v21c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-21l-6-6zM16 26l-10-8h6v-6h8v6h6l-10 8zM4.828 6l2-2h18.343l2 2h-22.343z"></path></svg></div><div id="unarchive" class="${archived ? "active" : null}"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><title>Unarchive</title><path d="M26 2h-20l-6 6v21c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-21l-6-6zM20 20v6h-8v-6h-6l10-8 10 8h-6zM4.828 6l2-2h18.343l2 2h-22.343z"></path></svg></div><div id="delete"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32"><title>Delete</title><path d="M6 32h20l2-22h-24zM20 4v-4h-8v4h-10v6l2-2h24l2 2v-6h-10zM18 4h-4v-2h4v2z"></path></svg></div></div>
      </td>
  </tr>`;

const renderNotes = () => {
  noteActive.innerHTML = null;
  noteArchive.innerHTML = null;

  try {
    for (let i = 0; i < notes.length; i++) {
      datesFromContent(i);
      !notes[i].archived ? (noteActive.innerHTML += getNote(notes[i], i)) : (noteArchive.innerHTML += getNote(notes[i], i));
    }

    const getNoteId = document.querySelectorAll("[data-note]");
    const setMaxLength = document.querySelectorAll("td span");

    deleteNoteRender(getNoteId);
    archiveNoteRender(getNoteId);
    editNoteRender(getNoteId);

    statusNotes(getNoteId);
    maxLengthFunc(setMaxLength);
  } catch (error) {
    console.log(error);
  }
};
renderNotes();
 // Notes
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
 // Status

// Tools Note
const createNote = document.querySelector(".add__note");
const createNoteForm = document.querySelector(".create__note-form");
const createNoteFormOpen = document.querySelector(".create__note-btn");
const createNoteFormClose = document.querySelector(".create__note-form .close");

createNote.addEventListener("click", (e) => {
  e.preventDefault();
  const newName = document.querySelector("#newName");
  const newCategory = document.querySelector("#newCategory");
  const newContent = document.querySelector("#newContent");

  try {
    if (browsingError([newName, newCategory, newContent])) return;
    const newNote = {
      name: newName.value.trim(),
      created: moment().format("ll"),
      category: newCategory.value,
      content: newContent.value.trim(),
      dates: "",
    };

    createNoteForm.reset();
    notes.push(newNote);
    toggleActive();
    renderNotes();
  } catch (error) {
    console.log(error);
  }
});
 // Create
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

    editNote.addEventListener("click", () => {
      toggleEditSaveNote([editNote, editNoteSave]);
      editName.innerHTML = `<input value="${notes[id].name}" type="text" placeholder="Name" required />`;
      editCategory.innerHTML = `<select name="category" required>  <option value="" disabled >Category</option>  <option ${notes[id].category === "Task" ? "selected" : false} value="Task">Task</option>  <option ${notes[id].category === "Idea" ? "selected" : false} value="Idea">Idea</option>  <option ${notes[id].category === "Random Thought" ? "selected" : false} value="Random Thought">Random Thought</option>  <option ${notes[id].category === "Quote" ? "selected" : false} value="Quote">Quote</option></select>`;
      editContent.innerHTML = `<input value="${notes[id].content}" type="text" placeholder="Content" required />`;
    });

    editNoteSave.addEventListener("click", () => {
      const editNameValue = noteId.querySelector(`.noteName input`);
      const editCategoryValue = noteId.querySelector(`.noteCategory select`);
      const editContentValue = noteId.querySelector(`.noteContent input`);

      if (browsingError([editNameValue, editCategoryValue, editContentValue])) return;

      notes[id].name = editNameValue.value;
      notes[id].category = editCategoryValue.value;
      notes[id].content = editContentValue.value;

      toggleEditSaveNote([editNote, editNoteSave]);
      renderNotes();
    });
  });
}
 // Edit
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
 // Archive
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
 // Delete

// Assets Note
function datesFromContent(id) {
  const content = notes[id].content;

  const getDateRegExp = /(\d{1,2}(\/|-|:)\d{1,2}(\/|-|:)\d{2,4})/gm;
  const getDate = content.match(getDateRegExp);
  if (!getDate) return "";

  const validDateRegExp = /^(((0?[1-9]|[12]\d|3[01])(\/|-|:)(0?[13578]|1[02])(\/|-|:)((19|[2-9]\d)\d{2}))|((0?[1-9]|[12]\d|30)(\/|-|:)(0[13456789]|1[012])(\/|-|:)((19|[2-9]\d)\d{2}))|((0?[1-9]|1\d|2[0-8])(\/|-|:)02(\/|-|:)((19|[2-9]\d)\d{2}))|(29(\/|-|:)02(\/|-|:)((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
  const validDate = getDate.filter((date) => date.match(validDateRegExp) !== null);

  notes[id].dates = validDate.join(", ");
}
 // Dates From Content
function browsingError(newNoteItems) {
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
}
 // Browsing Error
function maxLengthFunc(maxLength) {
  maxLength.forEach((max) => {
    if (max.parentNode.classList.value === "noteDates") {
      const lastData = max.textContent.split(",");
      if (lastData.length > 2) {
        max.textContent =
          "..., " +
          lastData
            .slice(lastData.length - 2)
            .join()
            .trim();
        max.parentNode.classList.add("more");
      }
      return;
    }
    if (max.offsetWidth >= 170) {
      const lastLength = max.textContent.split("");
      const length = lastLength.length;
      max.textContent = null;
      for (let i = 0; i < length; i++) {
        max.textContent += lastLength.shift();
        if (max.offsetWidth >= 160) {
          i = length;
          max.textContent += "...";
          max.parentNode.classList.add("more");
        }
      }
    }
  });
}
 // Max Length Text Notes
function toggleActive() {
  createNoteFormOpen.classList.toggle("active");
  createNoteForm.classList.toggle("active");
}
function toggleCreateForm(toggleCreateNote) {
  toggleCreateNote.forEach((toggleNote) => toggleNote.addEventListener("click", () => toggleActive()));
}
toggleCreateForm([createNoteFormOpen, createNoteFormClose]);
 // Toggle Create Form

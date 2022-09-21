const browsingError = (newNoteItems) => {
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

"use strict";
import notes from "./store.min.js";

// Render 
@@include('components/renderNotes.js')
@@include('components/statusNotes.js')

// Tools Note
@@include('components/tools/createNote.js')
@@include('components/tools/editNote.js')
@@include('components/tools/archiveNote.js')
@@include('components/tools/deleteNote.js')


// Assets Note
@@include('components/assets/browsingError.js')
@@include('components/assets/maxLength.js')
@@include('components/assets/toggleForm.js')

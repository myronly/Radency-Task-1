"use strict";
import notes from "./store.min.js";

// Render 
@@include('components/renderNotes.js') // Notes
@@include('components/statusNotes.js') // Status

// Tools Note
@@include('components/tools/createNote.js') // Create
@@include('components/tools/editNote.js') // Edit
@@include('components/tools/archiveNote.js') // Archive
@@include('components/tools/deleteNote.js') // Delete

// Assets Note
@@include('components/assets/datesFromContent.js') // Dates From Content
@@include('components/assets/browsingError.js') // Browsing Error
@@include('components/assets/maxLength.js') // Max Length Text Notes
@@include('components/assets/toggleForm.js') // Toggle Create Form

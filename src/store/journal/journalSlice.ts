import { createSlice } from '@reduxjs/toolkit'
import { JournalState, Note } from './interfaces'
import { PayloadAction } from '@reduxjs/toolkit'

const initialState : JournalState = {
  isSaving : false,
  messageSaved : '',
  notes : [],
  active : null,
  favoriteNotes : [],
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setSavingNewNote : (state) => {
      state.isSaving = true;
    },
    finishSavingNewNote : (state) => {
      state.isSaving = false;
    },
    setActiveNote : (state, action : PayloadAction<Note>) => {
      state.active = action.payload;
    },
    addNewEmptyNote : (state, action : PayloadAction<Note>) => {
      state.notes = [...state.notes, action.payload];
    },
    setNotes : (state, action : PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    updateNoteById : (state, action : PayloadAction<Note>) => {
      state.notes = state.notes.map( note => note.id === action.payload.id ? action.payload : note );
      state.active = action.payload;
      state.messageSaved = 'Note updated successfully';
    },

    setPhotosToActiveNote : (state, action : PayloadAction<string[]>) => {
      state.active!.imageUrls = [...state.active!.imageUrls, ...action.payload];
    },

    deleteImageFromActiveNote : (state, action : PayloadAction<boolean[]>) => {
      state.active!.imageUrls = state.active!.imageUrls.filter( (_, index) => !action.payload[index] );
    },

    deleteNoteById : (state, action : PayloadAction<string>) => {
      state.notes = state.notes.filter( note => note.id !== action.payload );
      state.active = null;
      state.messageSaved = '';
      state.isSaving = false;
      state.favoriteNotes = state.favoriteNotes.filter( note => note.id !== action.payload );
    },

    cancelNoteById : (state, action : PayloadAction<string>) => {
      state.notes = state.notes.filter( note => note.id !== action.payload );
      state.active = null;
      state.messageSaved = '';
    },
    clearNotesLogout : (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    }
  }
})

export const { setActiveNote, addNewEmptyNote, setNotes, setSavingNewNote, clearNotesLogout, finishSavingNewNote, updateNoteById, deleteImageFromActiveNote, deleteNoteById, cancelNoteById, setPhotosToActiveNote } = journalSlice.actions
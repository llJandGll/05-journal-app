import { doc, setDoc, collection, deleteDoc } from "firebase/firestore/lite";
import { RootState } from "../store";
import { Note } from "./interfaces";
import { setActiveNote, clearNotesLogout, setSavingNewNote, setNotes, addNewEmptyNote, finishSavingNewNote, updateNoteById, deleteNoteById, setPhotosToActiveNote } from "./journalSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { FirebaseDb } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../../helpers/uploadImages";
import { deleteImage } from "../../helpers/deleteImage";
export const startNewNote = () => {
  return async (dispatch : Dispatch, getAuth : () => RootState) => {
    const { uid } = getAuth().auth.user!;
    const newNote : Note = {
      title : '',
      body : '',
      imageUrls : [],
      date : new Date().getTime(),
      isFavorite : false,
    }
    const newDoc = doc( collection( FirebaseDb, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;
    dispatch(setActiveNote(newNote));
    dispatch(addNewEmptyNote(newNote));
    
  }
}

export const startSaveNote = ( ) => {
  return async (dispatch : Dispatch, getAuth : () => RootState) => {
    dispatch(setSavingNewNote());
    try {
      const { uid } = getAuth().auth.user!;
      const { active: note } = getAuth().journal;
      if (!note) return;

      const firestoreNote = { ...note };
      delete firestoreNote.id;

      const docRef = doc( FirebaseDb, `${uid}/journal/notes/${note.id}`);
      await setDoc(docRef, firestoreNote, { merge : true });
      Swal.fire('Nota Actualizada Correctamente', '', 'success');
      dispatch(updateNoteById(note)); 
      dispatch(finishSavingNewNote());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      Swal.fire('Error updating note', error.message, 'error');
      dispatch(finishSavingNewNote());
    }
  }
}
export const startLoadingNotes = () => {
  return async (dispatch : Dispatch, getAuth : () => RootState) => {
    const { uid } = getAuth().auth.user!;
    if (!uid) return;
    const notes = await loadNotes(uid);
    const finalNotes = await Promise.all(notes);
    dispatch(setNotes(finalNotes));
  }
}

export const startDeleteNote = () => {
  return async (dispatch : Dispatch, getAuth : () => RootState) => {
    try {
      const { active: note } = getAuth().journal;
      
      if (!note || !note.id) {
        Swal.fire('Error', 'No hay nota activa para eliminar', 'error');
        return;
      }
      
      // Mostrar el diálogo de confirmación ANTES de eliminar
      const result = await Swal.fire({
        title: "¿Está seguro?",
        text: "Esta acción eliminará la nota y sus imágenes asociadas. No podrá revertir esto.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      });
      
      // Si el usuario no confirma, cancelar la operación
      if (!result.isConfirmed) {
        return;
      }
      
      // A partir de aquí, el usuario ha confirmado la eliminación
      dispatch(setSavingNewNote());
      
      // Obtener el UID después de confirmar
      const { uid } = getAuth().auth.user!;
      
      // 1. Eliminar la nota de Firestore
      const docRef = doc(FirebaseDb, `${uid}/journal/notes/${note.id}`);
      await deleteDoc(docRef);
      
      // 2. Procesar las imágenes en Cloudinary
      const { imageUrls } = note;
      let imageProcessMessage = '';
      
      if (imageUrls && imageUrls.length > 0) {
        try {
          const processingPromises = imageUrls.map(imageUrl => deleteImage(imageUrl));
          const processingResults = await Promise.all(processingPromises);
          
          const successCount = processingResults.filter(result => result).length;
          
          if (successCount === imageUrls.length) {
            imageProcessMessage = 'Las imágenes se han procesado correctamente.';
          } else {
            imageProcessMessage = `Solo se procesaron ${successCount} de ${imageUrls.length} imágenes.`;
          }
        } catch (imgError) {
          console.error('Error al procesar imágenes:', imgError);
          imageProcessMessage = 'No se pudieron procesar las imágenes asociadas.';
        }
      }
      
      // 3. Actualizar el estado de Redux
      dispatch(deleteNoteById(note.id));
      dispatch(finishSavingNewNote());
      
      // 4. Mostrar mensaje de éxito
      const detailMessage = imageUrls.length > 0 
        ? imageProcessMessage
        : 'La nota ha sido eliminada correctamente.';
        
      Swal.fire({
        title: "¡Eliminado!",
        text: detailMessage,
        icon: "success"
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      dispatch(finishSavingNewNote());
      Swal.fire('Error', 'No se pudo eliminar la nota. Intente nuevamente.', error.message);
    }
  }
}

export const startUploadImages = (files : File[]) => {
  return async (dispatch : Dispatch, getAuth : () => RootState) => {
    dispatch(setSavingNewNote());
    try { 
      const { uid } = getAuth().auth.user!;
      if (!uid) return;
      const fileUploadPromises = files.map(file => fileUpload(file));
      const fileUrls = await Promise.all(fileUploadPromises);
      dispatch(setPhotosToActiveNote(fileUrls));
      dispatch(finishSavingNewNote());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      Swal.fire('Error uploading images', '', error.message);
      dispatch(finishSavingNewNote());
    }
  }
}


export const startLogoutJournal = () => {
  return async (dispatch : Dispatch) => {
    dispatch(clearNotesLogout());
  }
}



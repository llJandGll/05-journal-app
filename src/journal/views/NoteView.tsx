import { SaveOutlined, AddPhotoAlternateOutlined, DeleteOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components'
import { useFormJournal } from '../../hooks/useFormJournal';
import { NoteValidator } from '../validators/NoteValidator';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppStore';
import { startDeleteNote, startSaveNote, startUploadImages } from '../../store/journal/thunks';
import { Note } from '../../store/journal/interfaces';
import { setActiveNote } from '../../store/journal/journalSlice';
import Swal from 'sweetalert2';


export const NoteView = () => {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { active : note } = useAppSelector( state => state.journal );
  const { imageUrls } = note!;
  const [noteSubmitted, setNoteSubmitted] = useState(false);

  const { formState, onInputChange, isFormValid, formErrorMessage,onResetForm } = useFormJournal( note as Note, NoteValidator );
  const { title, body, date } = formState;

  const { title : titleError, body : bodyError } = formErrorMessage;

  const dispatch = useAppDispatch();
  const { isSaving } = useAppSelector(state => state.journal);

  const onSaveNote = () => {
    
    setNoteSubmitted( true );
    if ( !isFormValid() ) return;
    dispatch(startSaveNote());
    onResetForm();
    setNoteSubmitted( false );
  }

  const createAt = () => {
    const dateFormatted = new Date(date).toLocaleDateString() + " a las " + new Date(date).toLocaleTimeString();
    return dateFormatted;
  }

  const onDeleteNote = () => {
    dispatch(startDeleteNote());
  }


  const onFileInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) return;
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        Swal.fire('Solo se aceptan imágenes', '', 'error');
        fileInputRef.current!.value = '';
        return;
      }
    }
    dispatch(startUploadImages(Array.from(files)));
    fileInputRef.current!.value = '';
  }


  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [dispatch, formState]); 

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' > Fecha Creada { createAt() } </Typography>
        </Grid>
        <Grid item>

          <input
            multiple
            type="file"
            name="file"
            id="file"
            style={{ display: 'none' }}
            ref={ fileInputRef }  
            onChange={ onFileInputChange }
          />
          
          <Button
            color="primary"
            sx={{ padding: 2 }}
            onClick={ () => fileInputRef.current?.click() }
            disabled={ isSaving }
          >
            <AddPhotoAlternateOutlined sx={{ fontSize: 30, mr: 1 }} color='primary'/>
            Agregar
          </Button>
          <Button 
              color="primary" 
              sx={{ padding: 2 }}
              onClick={ onSaveNote }
              disabled={ isSaving }
          >
              <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
              Guardar
          </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Título de Recuerdo"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
                error={ !!titleError && noteSubmitted }
                helperText={ titleError && noteSubmitted ? titleError : null }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
                error={ !!bodyError && noteSubmitted }
                helperText={ bodyError && noteSubmitted ? bodyError : null }
            />
        </Grid>
        <Grid item xs={ 12 } display='flex' justifyContent='end'>
          <Button 
            color="error" 
            sx={{ padding: 2 }}
            onClick={ onDeleteNote }
            disabled={ isSaving }

          >
          <DeleteOutlined sx={{ fontSize: 30, mr: 1 }} />
          Eliminar Nota
        </Button>
        </Grid>
        {/* Image gallery */}
        <ImageGallery images={ imageUrls } />

    </Grid>
  )
}

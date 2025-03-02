import { SaveOutlined, AddPhotoAlternateOutlined, DeleteOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    
    <Grid 
      container 
      direction='column'
      sx={{ mb: 1, p: isMobile ? 2 : 0 }}
    >
      {/* Header */}
      <Grid 
        item 
        container 
        direction={isMobile ? 'column' : 'row'} 
        justifyContent='space-between' 
        alignItems={isMobile ? 'flex-start' : 'center'}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Grid item xs={12} sm='auto'>
          <Typography 
            fontSize={isMobile ? 24 : 39} 
            fontWeight='light'
            sx={{ wordBreak: 'break-word' }}
          >
            Fecha Creada {createAt()}
          </Typography>
        </Grid>

        {/* Buttons */}
        <Grid 
          item 
          container 
          xs={12} sm='auto'
          spacing={1}
          direction={isMobile ? 'row' : 'row'}
          justifyContent={isMobile ? 'space-between' : 'flex-end'}
        >
          <Grid item>
            <input
              multiple
              type="file"
              name="file"
              id="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={onFileInputChange}
            />
            
            <Button
              fullWidth={isMobile}
              color="primary"
              sx={{ padding: isMobile ? 1 : 2 }}
              onClick={() => fileInputRef.current?.click()}
              disabled={isSaving}
            >
              <AddPhotoAlternateOutlined sx={{ fontSize: isMobile ? 24 : 30, mr: 1 }} />
              {!isMobile && 'Agregar'}
            </Button>
          </Grid>

          <Grid item>
            <Button 
              fullWidth={isMobile}
              color="primary" 
              sx={{ padding: isMobile ? 1 : 2 }}
              onClick={onSaveNote}
              disabled={isSaving}
            >
              <SaveOutlined sx={{ fontSize: isMobile ? 24 : 30, mr: 1 }} />
              {!isMobile && 'Guardar'}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Form */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            type="text"
            variant="filled"
            fullWidth
            placeholder="Título de Recuerdo"
            label="Título"
            sx={{ border: 'none' }}
            name="title"
            value={title}
            onChange={onInputChange}
            error={!!titleError && noteSubmitted}
            helperText={titleError && noteSubmitted ? titleError : null}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField 
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="¿Qué sucedió en el día de hoy?"
            minRows={5}
            name="body"
            value={body}
            onChange={onInputChange}
            error={!!bodyError && noteSubmitted}
            helperText={bodyError && noteSubmitted ? bodyError : null}
          />
        </Grid>
      </Grid>

      {/* Delete Button */}
      <Grid 
        item 
        xs={12} 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          mt: 2 
        }}
      >
        <Button 
          color="error" 
          sx={{ 
            padding: isMobile ? 1 : 2,
            width: isMobile ? '100%' : 'auto'
          }}
          onClick={onDeleteNote}
          disabled={isSaving}
        >
          <DeleteOutlined sx={{ fontSize: isMobile ? 24 : 30, mr: 1 }} />
          Eliminar Nota
        </Button>
      </Grid>

      {/* Image gallery */}
      <ImageGallery images={imageUrls} />
    </Grid>
  );
};

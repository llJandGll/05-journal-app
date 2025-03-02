import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout.tsx';
import { NoteView, NothingSelectedView } from '../views';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppStore.ts';
import { useMemo } from 'react';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {

  const dispatch = useAppDispatch();
  const { active, isSaving } = useAppSelector(state => state.journal);
  
  const onClickNewNote = () => {
    dispatch(startNewNote());
  }
  
  const checkingSaving = useMemo(() => isSaving, [isSaving]);
  
  // console.log('se dibuja el componente');
  return (
    <JournalLayout>
      

      {
        (active) ? <NoteView /> : <NothingSelectedView />
      }


      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        onClick={onClickNewNote}
        disabled={ checkingSaving }
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}

import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout.tsx';
import { NoteView, NothingSelectedView } from '../views';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppStore.ts';
import { useMemo } from 'react';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        size={isMobile ? 'medium' : 'large'}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: isMobile ? 20 : 50,
          bottom: isMobile ? 20 : 50,
          width: isMobile ? 50 : 60,
          height: isMobile ? 50 : 60
        }}
        onClick={onClickNewNote}
        disabled={ checkingSaving }
      >
        <AddOutlined sx={{ fontSize: isMobile ? 25 : 30 }} />
      </IconButton>

    </JournalLayout>
  )
}

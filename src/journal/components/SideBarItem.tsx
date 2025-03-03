import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { Note } from "../../store/journal/interfaces";
import { useAppDispatch } from "../../hooks/useAppStore";
import { setActiveNote } from "../../store/journal/journalSlice";

interface Props extends Note {
  onClick?: () => void;
}

export const SideBarItem: React.FC<Props> = ({ 
  title, 
  body, 
  id, 
  imageUrls, 
  date, 
  isFavorite,
  onClick 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();

  const onActiveNote = () => {
    dispatch(setActiveNote({ title, body, id, imageUrls, date, isFavorite }));
    if (onClick) onClick();
  }

  const compressText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }

  return (
    <ListItem disablePadding>
      <ListItemButton 
        onClick={onActiveNote}
        sx={{
          py: isMobile ? 1 : 2,
          px: isMobile ? 1 : 2,
          transition: 'all 0.3s ease',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            transform: 'translateX(4px)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }
        }}
      >
        <ListItemIcon>
          <TurnedInNot sx={{ 
            fontSize: isMobile ? '1.2rem' : '1.5rem',
            color: 'white'
          }} />
        </ListItemIcon>
        <Grid container>
          <ListItemText 
            primary={compressText(title, isMobile ? 15 : 21)}
            sx={{
              '& .MuiListItemText-primary': {
                color: 'white',
                fontSize: isMobile ? '0.9rem' : '1rem'
              }
            }}
          />
          <ListItemText 
            secondary={compressText(body, isMobile ? 15 : 21)}
            sx={{
              '& .MuiListItemText-secondary': {
                color: 'rgba(255,255,255,0.7)',
                fontSize: isMobile ? '0.8rem' : '0.9rem'
              }
            }}
          />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
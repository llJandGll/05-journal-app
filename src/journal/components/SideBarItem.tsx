import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Note } from "../../store/journal/interfaces";
import { useAppDispatch } from "../../hooks/useAppStore";
import { setActiveNote } from "../../store/journal/journalSlice";


export const SideBarItem : React.FC<Note> = ({ title, body, id, imageUrls, date, isFavorite }) => {
  const dispatch = useAppDispatch();
  const onActiveNote = () => {
    dispatch(setActiveNote({ title, body, id, imageUrls, date, isFavorite }));
  }

  const compressTitle = (title : string) => {
    return title.length > 21 ? title.substring(0, 21) + "..." : title;
  }

  const compressBody = (body : string) => {
    return body.length > 21 ? body.substring(0, 21) + "..." : body;
  }


  return (
    <>
       <ListItem id={ id } disablePadding>
        <ListItemButton onClick={ () => onActiveNote() }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ compressTitle(title) } />
                <ListItemText secondary={ compressBody(body) } />
            </Grid>
        </ListItemButton>
      </ListItem>
    </>
  )
}
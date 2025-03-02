import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDb } from "../firebase/config";
import { Note } from "../store/journal/interfaces";

export const loadNotes = async (uid : string) => {
  const collectionRef = collection(FirebaseDb, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);
  const notes : Note[] = [];
  docs.forEach(doc => {
    notes.push({
      id : doc.id,
      ...doc.data() as Note
    })
  })
  
  return notes;
}

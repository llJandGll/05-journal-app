import { ErrorMessageNote } from "../interfaces/ErrorMessageNote";

export const NoteValidator : ErrorMessageNote = {
  title : [ ( title : string ) => title.length > 0, 'El título es requerido' ],
  body : [ ( body : string ) => body.length > 0, 'Necesitarás agregar un recuerdo' ],
}



export interface ErrorMessageNote {
  title : [ ( title : string ) => boolean | null , string | null ]
  body : [ ( body : string ) => boolean | null , string | null ]
}



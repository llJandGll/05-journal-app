export interface ErrorMessageAuth {
  name : [ ( name : string ) => boolean | null , string | null ]
  email : [ ( email : string ) => boolean , string ]
  password : [ ( password : string ) => boolean , string ]
  uid : [ (  ) => boolean | null , string | null ]
  photoURL : [ (  ) => boolean  | null , string | null ]
}



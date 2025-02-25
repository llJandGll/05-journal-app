export interface ErrorMessageAuth {
  name : [ ( name : string ) => boolean , string ]
  email : [ ( email : string ) => boolean , string ]
  password : [ ( password : string ) => boolean , string ]
}



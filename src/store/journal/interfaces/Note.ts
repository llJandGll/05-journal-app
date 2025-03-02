export interface Note {
  id? : string;
  title : string;
  body : string;
  imageUrls : string[];
  date : number;
  isFavorite : boolean;
}


export interface IAlbum {
  id: string;
  name: string;
  release_date: Date;
}

export class Album implements IAlbum {
  id: string;
  name: string;
  release_date: Date;
}

export interface IArtist {
  id: string;
  name: string;
  genres: [];
}

export class Artist implements IArtist {
  id: string;
  name: string;
  genres: [];
}

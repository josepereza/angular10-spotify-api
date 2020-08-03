import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify/spotify.service';

import { IToken } from 'src/app/models/token';
import { Artist } from 'src/app/models/artist';
import { Album } from 'src/app/models/album';

@Component({
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  artist: Artist = new Artist();
  albums: Album[];

  constructor(
    private _route: ActivatedRoute,
    private _spotify: SpotifyService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.artist.id = params['id'];
    });

    this._spotify.getToken().subscribe((token: IToken) => {
      this._spotify.token = token;
      this._spotify.getArtist(this.artist.id).subscribe((artist: Artist) => {
        this.artist = artist;
      });
      this._spotify.getAlbums(this.artist.id).subscribe((albums: Album[]) => {
        this.albums = albums.filter(
          (a, i, albums) =>
            albums.findIndex(
              (b) => b.name.toLowerCase() === a.name.toLowerCase()
            ) === i
        );
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify/spotify.service';

import { IToken } from 'src/app/models/token';
import { Album } from 'src/app/models/album';

@Component({
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album: Album = new Album();

  constructor(
    private _route: ActivatedRoute,
    private _spotify: SpotifyService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.album.id = params['id'];
    });

    this._spotify.getToken().subscribe((token: IToken) => {
      this._spotify.token = token;
      this._spotify.getAlbum(this.album.id).subscribe((album: Album) => {
        this.album = album;
        console.log(album);
      });
    });
  }
}

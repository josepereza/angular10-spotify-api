import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';

import { IToken } from 'src/app/models/token';
import { IArtist } from 'src/app/models/artist';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchTerm: string;
  artists: IArtist[];

  constructor(private _spotify: SpotifyService) {}

  ngOnInit(): void {
    this._spotify.getToken().subscribe((token: IToken) => {
      this._spotify.token = token;
    });
  }

  searchMusic() {
    this._spotify
      .searchArtists(this.searchTerm)
      .subscribe((artists: IArtist[]) => {
        this.artists = artists;
      });
  }
}

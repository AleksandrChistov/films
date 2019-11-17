import { Component, OnInit } from '@angular/core';
import { AppSearchService } from '../shared/app-search.service';

export interface FavoriteFilms {
  id: number
  overview: string
  poster_path: string
  title: string
  genre_ids?: []
  results?: []
  favorite?: boolean
  genres?: {
    name: string
  }
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.styl']
})
export class FavoritesComponent implements OnInit {

  favoriteFilms: FavoriteFilms[] = []
  loadingFavorite: boolean = true

  constructor(private appSearchService: AppSearchService) { }

  ngOnInit() {
    this.loadFavoriteFilms();
  }

  loadFavoriteFilms() {
    this.loadingFavorite = true
    this.appSearchService.resultsAdd = false;
    this.appSearchService.text = '';
    let filmFavoritesArr: FavoriteFilms[] = JSON.parse(localStorage.getItem('filmFavorites')) || [];

    if (filmFavoritesArr.length > 0) {
      filmFavoritesArr.map((filmFavorite: any )=> {  
        if (!filmFavorite.genre_ids && filmFavorite.genres.length) {
          filmFavorite.genres.map((genre: any, i: number) => {
            filmFavorite.genre_ids = [];
            filmFavorite.genre_ids.push(genre.name);
          });
          filmFavorite.genre_ids = filmFavorite.genre_ids.join(', ');
        }
      });
    }
    this.favoriteFilms = filmFavoritesArr;
    this.loadingFavorite = false;
  }

  changeFavorites(id: number, context: boolean) {
    this.loadingFavorite = true
    let film = this.favoriteFilms.find(film => film.id === id);
    film.favorite = !film.favorite;
    let filmFavoritesArr = JSON.parse(localStorage.getItem('filmFavorites')) || [];
    if (context) {
      filmFavoritesArr.push(film);
    } else {
      filmFavoritesArr.map((item: any, index: number) => {
        if (item.id === film.id) {
          filmFavoritesArr.splice(index, 1);
        }
      });
    }
    localStorage.setItem('filmFavorites', JSON.stringify(filmFavoritesArr));
    this.favoriteFilms = filmFavoritesArr;
    this.loadingFavorite = false;
  }

  search(eventValue: string) {
    this.appSearchService.searchAdd(eventValue);
  }

}

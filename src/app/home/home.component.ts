import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PopularFilms {
  id: number
  overview: string
  poster_path: string
  title: string
  genre_ids: []
  results?: []
  favorite?: boolean
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  genres = [
    {id: 28, name: "боевик"},
    {id: 12, name: "приключения"},
    {id: 16, name: "мультфильм"},
    {id: 35, name: "комедия"},
    {id: 80, name: "криминал"},
    {id: 99, name: "документальный"},
    {id: 18, name: "драма"},
    {id: 10751, name: "семейный"},
    {id: 14, name: "фэнтези"},
    {id: 36, name: "история"},
    {id: 27, name: "ужасы"},
    {id: 10402, name: "музыка"},
    {id: 9648, name: "детектив"},
    {id: 10749, name: "мелодрама"},
    {id: 878, name: "фантастика"},
    {id: 10770, name: "телевизионный фильм"},
    {id: 53, name: "триллер"},
    {id: 10752, name: "военный"},
    {id: 37, name: "вестерн"}
  ]

  loadingOne: boolean = true
  loading: boolean = true
  page: number = 1
  popularFilms: PopularFilms[] = []

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadFilms();
    window.addEventListener('scroll', this.scroll.bind(this));
  }

  loadFilms(bool?: boolean) {
    this.loading = true;
    this.http.get<PopularFilms>(`https://api.themoviedb.org/3/movie/popular?api_key=b3097ca6783d35649a9f47c87dcbbfa0&language=ru-RU&page=${this.page || 1}`)
    .subscribe(response => {
      this.pushFilms(response.results, bool);
    });
  }

  pushFilms(response: [], bool?: boolean) {
    let filmFavoritesArr = JSON.parse(localStorage.getItem('filmFavorites')) || [];
    response.map((film: any) => {
      if (filmFavoritesArr.length > 0) {
        filmFavoritesArr.forEach((filmFavorite: any )=> {
          if (filmFavorite.id === film.id) {
            film.favorite = true;
          }
        });
      }
      film.genre_ids.map((number: number, i: number) => {
        let genreArr = this.genres.find(genre => number === genre.id);
        if (genreArr) {
          film.genre_ids[i] = genreArr.name;
        }
      });
      film.genre_ids = film.genre_ids.join(', '); 
    });
    bool ? this.popularFilms = response : this.popularFilms.push(...response);
    this.loading = false;
    if (this.loadingOne) this.loadingOne = false;
  }

  scroll() {
    let scrollY: number = document.body.scrollTop || document.documentElement.scrollTop;
    let windowY: number = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    if (scrollY + 1 >= windowY) {
      this.page = this.page + 1;
      this.loadFilms();
    }
  }

  changeFavorites(id: number, context: boolean) {
    let film = this.popularFilms.find(film => film.id === id);
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
  }

  search(eventValue: string) {
    console.log(eventValue);
    
    if (eventValue.trim().length === 0) {
      this.page = 1;
      this.popularFilms = [];
      this.loadFilms(true);
    } else if (eventValue.trim().length > 2) {
      this.http.get<PopularFilms>(`https://api.themoviedb.org/3/search/movie?api_key=b3097ca6783d35649a9f47c87dcbbfa0&language=ru-RU&query=${eventValue}&page=1&include_adult=false`)
      .subscribe(response => {
        this.loading = true;
        this.page = 1;
        this.popularFilms = [];
        this.pushFilms(response.results);
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Film {
  genres?: []
  production_companies?: []
  production_countries?: []
  poster_path?: string
  id?: number
  favorite?: boolean
  credits?: {
    cast: []
  }
  videos?: {
    results: {}
  }
  recommendations?: {
    results: []
  }
  similar?: {
    results: []
  }
}

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.styl']
})
export class FilmComponent implements OnInit {

  film: Film = {}
  genre: string = ''
  productionCompanies: string = ''
  productionCountries: string = ''
  urlImg: string = ''
  urlVideo: string = ''
  urlVideoSecurity: SafeResourceUrl
  actors: object[] = []
  recommendations: object[] = [] 
  similar: object[] = []
  

  constructor(private route: ActivatedRoute, private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.loadFilm(params.id);
    });
  }

  loadFilm(id: number) {
    this.http.get<Film>(`https://api.themoviedb.org/3/movie/${id}?api_key=b3097ca6783d35649a9f47c87dcbbfa0&language=ru-RU&append_to_response=recommendations%2Csimilar%2Cvideos%2Ccredits`)
      .subscribe(response => {
        window.scrollTo(0,0);
        let arr = [];
        response.genres.forEach((genre: any) => {
          arr.push(genre.name);
        });
        this.genre = arr.join(', ');
        arr = [];
        response.production_companies.forEach((company: any) => {
          arr.push(company.name);
        });
        this.productionCompanies = arr.join(', ');
        arr = [];
        response.production_countries.forEach((country: any) => {
          arr.push(country.name);
        });
        this.productionCountries = arr.join(', ');
        this.actors = response.credits.cast.filter((val: object, i: number) => i < 6);
        this.urlImg = `https://image.tmdb.org/t/p/w300${response.poster_path}`;
        if (response.videos.results[0]) {
          this.urlVideo = `https://www.youtube.com/embed/${response.videos.results[0].key}?rel=0;showinfo=0;`;
          this.urlVideoSecurity = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlVideo);
        }
        this.recommendations = response.recommendations.results.filter((val: object, i: number) => i < 10);
        this.similar = response.similar.results.filter((val: object, i: number) => i < 10);
        
        let filmFavoritesArr = JSON.parse(localStorage.getItem('filmFavorites')) || [];
        
        if (filmFavoritesArr.length > 0) {
          filmFavoritesArr.forEach((filmFavorite: any )=> {
            if (filmFavorite.id === response.id) {
              response.favorite = true;
            }
          });
        }

        this.film = response;
        console.log(response);
    });
  }

  search(eventValue: string) {
    console.log(eventValue);
    
    // if (eventValue.trim().length === 0) {
    //   this.page = 1;
    //   this.popularFilms = [];
    //   this.loadFilms(true);
    // } else if (eventValue.trim().length > 2) {
    //   this.http.get<PopularFilms>(`https://api.themoviedb.org/3/search/movie?api_key=b3097ca6783d35649a9f47c87dcbbfa0&language=ru-RU&query=${eventValue}&page=1&include_adult=false`)
    //   .subscribe(response => {
    //     this.loading = true;
    //     this.page = 1;
    //     this.popularFilms = [];
    //     this.pushFilms(response.results);
    //   });
    // }
  }

  changeFavorites(context: boolean) {
    this.film.favorite = !this.film.favorite;
    let filmFavoritesArr = JSON.parse(localStorage.getItem('filmFavorites')) || [];
    if (context) {
      filmFavoritesArr.push(this.film);
    } else {
      filmFavoritesArr.map((item: any, index: number) => {
        if (item.id === this.film.id) {
          filmFavoritesArr.splice(index, 1);
        }
      });
    }
    localStorage.setItem('filmFavorites', JSON.stringify(filmFavoritesArr));
  }

}

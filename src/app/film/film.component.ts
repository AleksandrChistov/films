import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Film {
  genres?: []
  production_companies?: []
  production_countries?: []
  poster_path?: string
  credits?: {
    cast: []
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
  actors: object[] = []
  

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.loadFilm(params.id);
    });
  }

  loadFilm(id: number) {
    this.http.get<Film>(`https://api.themoviedb.org/3/movie/${id}?api_key=b3097ca6783d35649a9f47c87dcbbfa0&language=ru-RU&append_to_response=recommendations%2Csimilar%2Cvideos%2Ccredits`)
      .subscribe(response => {
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
        this.urlImg = `https://image.tmdb.org/t/p/w300${response.poster_path}`
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

}

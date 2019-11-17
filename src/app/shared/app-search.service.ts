import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SeacrhFilms {
  id: number
  overview: string
  poster_path: string
  title: string
  genre_ids: []
  results?: []
  favorite?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AppSearchService {

  seacrhFilms: SeacrhFilms[] = []
  resultsAdd: boolean = false
  text: string = ''

  constructor(private http: HttpClient) { }

  searchAdd(value) {
    if (value.trim().length > 1) {
      this.resultsAdd = true;
      this.http.get<SeacrhFilms>(`https://api.themoviedb.org/3/search/movie?api_key=b3097ca6783d35649a9f47c87dcbbfa0&language=ru-RU&query=${value}&page=1&include_adult=false`)
      .subscribe(response => {
        this.seacrhFilms = response.results;
        console.log(this.seacrhFilms);
      });
    } else {
      this.resultsAdd = false;
    }
  }

}

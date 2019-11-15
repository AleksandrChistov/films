import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PopularFilms {
  id: number
  overview: string
  poster_path: string
  title: string
  genre_ids: []
  results?: []
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  popularFilms: PopularFilms[] = []

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<PopularFilms>(`https://api.themoviedb.org/3/movie/popular?api_key=b3097ca6783d35649a9f47c87dcbbfa0&language=ru-RU&page=1`)
      .subscribe(response => {
        this.popularFilms = response.results;
      })
  }

}

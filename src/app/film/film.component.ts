import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Film {
  genres?: []
}

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.styl']
})
export class FilmComponent implements OnInit {

  film: Film = {}
  genre: string = ''

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.http.get<Film>(`https://api.themoviedb.org/3/movie/${params.id}?api_key=b3097ca6783d35649a9f47c87dcbbfa0&language=ru-RU&append_to_response=recommendations%2Csimilar%2Cvideos`)
        .subscribe(response => {
          let arr = [];
          response.genres.forEach((genre: any) => {
            arr.push(genre.name);
          });
          this.genre = arr.join(', '); 
          this.film = response;
          console.log(response);
        });
    })
  }

}

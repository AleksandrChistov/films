import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.styl']
})
export class FilmComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.http.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=b3097ca6783d35649a9f47c87dcbbfa0&language=ru-RU&append_to_response=recommendations%2Csimilar%2Cvideos`)
        .subscribe(response => {
          console.log(response);
        });
    })
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmComponent } from './film/film.component';
import { FavoritesComponent } from './favorites/favorites.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'film/:id', component: FilmComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { AppComponent} from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';
import { SearchComponent } from './components/search/search.component';
import { FilmListComponent } from './components/film-list/film-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home/28/1', pathMatch: 'full' },
  { path: 'home/:genre/:page', component: HomeComponent },
  { path: 'movie/:id', component: DetailComponent },
  {
    path: 'nowplaying',
    component: FilmListComponent,
    data: { fetchFilmsFn: 'getPlaying' }
  },
  {
    path: 'popular',
    component: FilmListComponent,
    data: { fetchFilmsFn: 'getPopular' }
  },
  {
    path: 'toprated',
    component: FilmListComponent,
    data: { fetchFilmsFn: 'getToprated' }
  },
  {
    path: 'upcoming',
    component: FilmListComponent,
    data: { fetchFilmsFn: 'getUpcoming' }
  },
  {
    path: 'favorites',
    component: FilmListComponent,
    data: { isFavoritesList: true }
  },
  { path: 'search/:query/:page', component: SearchComponent }
];

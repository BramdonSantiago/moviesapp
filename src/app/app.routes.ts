import { Routes } from '@angular/router';
import { TabsFooterComponent } from '../app/components/tabs-footer/tabs-footer.component';

// export const routes: Routes = [
//   {
//     path: 'home',
//     loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
//   },
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full',
//   },
// ];

// export const routes: Routes = [
//   {
//     path: 'tabs-footer',
//     component: TabsFooterComponent,
//     children: [
//       {
//         path: 'home',
//         loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
//       },
//       {
//         path: 'search',
//         loadComponent: () => import('./search/search.page').then((m) => m.SearchPage),
//       },
//       {
//         path: 'watchlist',
//         loadComponent: () => import('./watchlist/watchlist.page').then((m) => m.WatchlistPage),
//       },
//       {
//         path: '',
//         redirectTo: '/tabs-footer/home',
//         pathMatch: 'full',
//       },
//     ],
//   },
//   {
//     path: 'movie-detail:id',
//     loadComponent: () => import('./movie-detail/movie-detail.page').then( m => m.MovieDetailPage)
//   },
//   {
//     path: '',
//     redirectTo: '/tabs-footer/home',
//     pathMatch: 'full',
//   },
// ];


export const routes: Routes = [
  {
    path: 'tabs-footer',
    component: TabsFooterComponent,
    children: [
      { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
      { path: 'search', loadComponent: () => import('./search/search.page').then(m => m.SearchPage) },
      { path: 'watchlist', loadComponent: () => import('./watchlist/watchlist.page').then(m => m.WatchlistPage) },
      { path: '', redirectTo: '/tabs-footer/home', pathMatch: 'full' },
    ],
  },
  { path: 'movie-detail/:id', loadComponent: () => import('./movie-detail/movie-detail.page').then(m => m.MovieDetailPage) },
  { path: '', redirectTo: '/tabs-footer/home', pathMatch: 'full' },
];

import { Component, inject, OnInit, computed } from '@angular/core';
import { IonContent, IonImg, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Movies } from '../services/movies';
register();


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonImg, RouterModule, IonRefresher, IonRefresherContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  // today = new Date();
  moviesService = inject(Movies);
  moviesTrendingToday = this.moviesService.moviesTrendingToday;
  moviesTrendingWeek = this.moviesService.moviesTrendingWeek;
  moviesOnCinemas = this.moviesService.moviesOnCinemas;
  moviesPopular = this.moviesService.moviesPopular;
  moviesTopRated = this.moviesService.moviesTopRated;
  moviesUpcoming = this.moviesService.moviesUpcoming;

  constructor() { }

  ngOnInit() {
    this.moviesService.getMoviesTrendingToday();
    this.moviesService.getMoviesTrendingWeek();
    this.moviesService.getMoviesOnCinemas();
    this.moviesService.getMoviesPopular();
    this.moviesService.getMoviesTopRated();
    this.moviesService.getMoviesUpcoming();
  }

  moviesUpcomingFiltered = computed(() => {
    const now = new Date();
    return this.moviesUpcoming().filter(movie => {
      const release = new Date(movie.release_date);
      return release > now;
    });
  });

  // moviesOnCinemasFiltered = computed(() => {
  //   const now = new Date();
  //   const threeMonthsAgo = new Date();
  //   threeMonthsAgo.setMonth(now.getMonth() - 3);

  //   // console.log(now);
  //   // console.log(threeMonthsAgo);

  //   return this.moviesOnCinemas().filter(movie => {
  //     const release = new Date(movie.release_date);
  //     console.log(movie);
  //     return release >= threeMonthsAgo && release <= now;

  //     // if (!movie.release_date) return false;

  //     // const releaseDate = new Date(movie.release_date);
  //     // return releaseDate >= threeMonthsAgo && releaseDate <= now;
  //   });
  // });

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      this.moviesService.getMoviesTrendingToday();
      this.moviesService.getMoviesTrendingWeek();
      this.moviesService.getMoviesOnCinemas();
      this.moviesService.getMoviesPopular();
      this.moviesService.getMoviesTopRated();
      this.moviesService.getMoviesUpcoming();
      this.moviesUpcomingFiltered;
      event.target.complete();
    }, 2000);
  }



}

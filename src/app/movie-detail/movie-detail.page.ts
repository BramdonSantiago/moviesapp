import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonBackButton, IonButtons, IonButton, IonIcon, IonImg, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, shareSocialOutline, heartOutline, heart } from 'ionicons/icons';
import { Share } from '@capacitor/share';
import { Browser } from '@capacitor/browser';
import { Storage } from '@ionic/storage-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

import { Movies } from '../services/movies';
import { Favorites } from '../services/favorites';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [RouterModule, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonButton, IonIcon, IonImg, IonTitle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieDetailPage implements OnInit {
  currentYear = new Date().getFullYear().toString();
  moviesService = inject(Movies);
  favoritesService = inject(Favorites);
  // storage = this.favoritesService.getFavorites;
  favorites = [];
  isFavorite = signal(false);
  idPage: any;
  movie = this.moviesService.detailMovie;
  movieTrailer = this.moviesService.detailMovieVideo;
  moviesRelated = this.moviesService.moviesRelated;

  constructor(private route: ActivatedRoute) {
    addIcons({ star, shareSocialOutline, heartOutline, heart });
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.idPage = Number(this.route.snapshot.paramMap.get('id'));
    this.movieDetail(this.idPage);
    this.isFavorite.set(this.favoritesService.isFavorite(this.idPage));
  }


  movieDetail(idPage: any) {
    this.moviesService.movieDetail(idPage);
    this.moviesService.getMoviesRelated(idPage);
  }

  trailers = computed(() => 
    this.movieTrailer().filter((video: any) => video.type === 'Trailer')
  );

  async share(movie: any) {
    await Share.share({
      title: movie.title,
      text: `Mira esta película: ${movie.title}\n${movie.overview}`,
      dialogTitle: 'Share with friends',
    });
  }

  openSite = async (videoKey: string) => {
    await Browser.open({ url: `https://www.youtube.com/watch?v=${videoKey}` });
  };

  async toggleFavorite(movie: any) {
    await this.favoritesService.toggleFavorite(movie);
    this.isFavorite.set(this.favoritesService.isFavorite(this.idPage));
  }

}

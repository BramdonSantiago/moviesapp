import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonImg, IonIcon, IonTitle, IonButton, IonCol, IonGrid, IonRow, IonItemOption, IonItemOptions, IonItemSliding, IonItem, ActionSheetController } from '@ionic/angular/standalone';
import { time, trashOutline, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Movies } from '../services/movies';
import { Watchlist } from '../services/watchlist';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RouterModule, IonImg, IonIcon, IonTitle, IonButton, IonCol, IonGrid, IonRow, IonItemOption, IonItemOptions, IonItemSliding, IonItem]
})
export class WatchlistPage implements OnInit {
  moviesService = inject(Movies);
  wathlistService = inject(Watchlist);
  watchlist = this.wathlistService.watchlist;
  actionSheetCtrl = inject(ActionSheetController);
  idMovie = signal(0);


  constructor() {
    addIcons({ time, trashOutline, trash });
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.wathlistService.getWatchList();
  }


  async presentActionSheet(movie: any) {
    this.idMovie.set(movie.id);
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      mode: 'ios',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.togglewatchlist(movie);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
          handler: () => {
            this.idMovie.set(0);
          }
        },
      ],
    });

    await actionSheet.present();
  }

  // movieDetail(idMovie: any) {
  //   this.moviesService.movieDetail(idMovie);
  // }

  async togglewatchlist(movie: any) {
    await this.wathlistService.toggleWatchList(movie);
  }

}

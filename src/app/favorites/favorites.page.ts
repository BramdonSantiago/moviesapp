import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonImg, IonIcon, IonTitle, IonButton, IonCol, IonGrid, IonRow, IonItemOption, IonItemOptions, IonItemSliding, IonItem, ActionSheetController } from '@ionic/angular/standalone';
import { heartOutline, heart, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Favorites } from '../services/favorites';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonImg, IonIcon, IonTitle, IonButton, CommonModule, FormsModule, RouterModule, IonCol, IonGrid, IonRow, IonItemOption, IonItemOptions, IonItemSliding, IonItem],
})
export class FavoritesPage implements OnInit {
  favoritesService = inject(Favorites);
  favorites = this.favoritesService.favorites;
  actionSheetCtrl = inject(ActionSheetController);

  isActionSheetOpen = false;

  constructor() {
    addIcons({ heartOutline, heart, trashOutline });
  }


  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.favoritesService.getFavorites();
    // await this.favoritesService.resetStorage();
  }



  async presentActionSheet(favorite: any) {
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
            this.toggleFavorite(favorite);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async toggleFavorite(favorite: any) {
    await this.favoritesService.toggleFavorite(favorite);
  }

}

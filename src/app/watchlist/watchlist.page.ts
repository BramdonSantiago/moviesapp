import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonImg, IonIcon, IonTitle, IonButton, IonCol, IonGrid, IonRow, IonItemOption, IonItemOptions, IonItemSliding, IonItem, ActionSheetController } from '@ionic/angular/standalone';
import { time, trashOutline, trash, reorderThreeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Movies } from '../services/movies';
import { Watchlist } from '../services/watchlist';
import { createSwapy, utils, Swapy } from 'swapy';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RouterModule, IonImg, IonIcon, IonTitle, IonButton, IonCol, IonGrid, IonRow, IonItemOption, IonItemOptions, IonItemSliding, IonItem]
})
export class WatchlistPage implements OnInit {
  watchlistService = inject(Watchlist);
  watchlist = this.watchlistService.watchlist;
  actionSheetCtrl = inject(ActionSheetController);
  idMovie = signal(0);

  @ViewChild('swapyContainer', { static: false })
  swapyContainer!: ElementRef;

  slotItemMap: { slot: string; item: string }[] = [];
  slottedItems: { slotId: string; itemId: string; item: any }[] = [];

  swapyInstance: any;


  constructor() {
    addIcons({ time, trashOutline, trash, reorderThreeOutline });
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.watchlistService.getWatchList();
    // await this.watchlistService.resetStorage();

    // Inicio de swipy
    this.slotItemMap = utils.initSlotItemMap(this.watchlist(), 'id');
    this.updateSlottedItems();

    if (this.watchlist().length > 0) {
      setTimeout(() => {
        if (this.swapyInstance) {
          this.swapyInstance.destroy?.();
        } 

        // if (!this.swapyContainer?.nativeElement) {
        //   console.error('El contenedor no existe todavía');
        //   return;
        //   } else {
        //   console.log('Existe contenedor');
        // }

        // Crea la instancia de Swapy
        this.swapyInstance = createSwapy(this.swapyContainer.nativeElement, {
          animation: 'spring',
          swapMode: 'drop',
          manualSwap: true
        });

        // Escucha el evento swap
        this.swapyInstance.onSwap((event: any) => {
          // event.newSlotItemMap.asArray es la nueva estructura
          this.slotItemMap = event.newSlotItemMap.asArray;
          this.updateSlottedItems();
          // Debes marcar para Angular que detecte cambios si no estás en zona Angular
        });
      }, 1000);
    }
  }

  async updateSlottedItems() {
    this.slottedItems = utils.toSlottedItems(this.watchlist(), 'id', this.slotItemMap) as any;
    await this.watchlistService._storage?.set('watchlist', this.slottedItems.map(s => s.item));
    console.log(this.slotItemMap);
    console.log(this.slottedItems);
  }



  updateSwapy() {
    if (this.swapyInstance) {
      this.swapyInstance.update();
      // y además uso la función “dynamicSwapy” de utils para sincronizar mapa
      utils.dynamicSwapy(this.swapyInstance, this.watchlist(), 'id', this.slotItemMap, (newMap) => {
        this.slotItemMap = newMap;
        this.updateSlottedItems();
      });
    }
  }


  async presentActionSheet(movie: any) {
    this.idMovie.set(movie.item.id);
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
            this.toggleWatchList(movie.item.id);
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

  async toggleWatchList(id: string) {
    this.watchlist.update(current => current.filter(u => u.id !== id));
    await this.watchlistService._storage?.set('watchlist', this.watchlist());
    this.updateSwapy();
  }


  // async togglewatchlist(movie: any) {
  //   await this.wathlistService.toggleWatchList(movie);
  // }

}

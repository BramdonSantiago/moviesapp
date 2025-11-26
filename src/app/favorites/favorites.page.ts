import { Component, inject, OnInit, signal, ElementRef, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonImg, IonIcon, IonTitle, IonButton, IonCol, IonGrid, IonRow, IonItemOption, IonItemOptions, IonItemSliding, IonItem, ActionSheetController } from '@ionic/angular/standalone';
import { heartOutline, heart, trashOutline, reorderThreeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Favorites } from '../services/favorites';
import { createSwapy, utils, Swapy } from 'swapy';

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
  idFavorite = signal(0);

  @ViewChild('swapyContainer', { static: false })
  swapyContainer!: ElementRef;

  slotItemMap: { slot: string; item: string }[] = [];
  slottedItems: { slotId: string; itemId: string; item: any }[] = [];



  swapyInstance: any;

  constructor() {
    addIcons({ heartOutline, heart, trashOutline, reorderThreeOutline });
  }


  ngOnInit() {
  }



  async ionViewWillEnter() {
    await this.favoritesService.getFavorites();

    // Inicio de swipy
    this.slotItemMap = utils.initSlotItemMap(this.favorites(), 'id');
    this.updateSlottedItems();

    if (this.favorites().length > 0) {
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
          manualSwap: true,
          autoScrollOnDrag: true
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
    this.slottedItems = utils.toSlottedItems(this.favorites(), 'id', this.slotItemMap) as any;
    await this.favoritesService._storage?.set('favorites', this.slottedItems.map(s => s.item));
    console.log(this.slotItemMap);
    console.log(this.slottedItems);
  }



  updateSwapy() {
    if (this.swapyInstance) {
      this.swapyInstance.update();
      // y además uso la función “dynamicSwapy” de utils para sincronizar mapa
      utils.dynamicSwapy(this.swapyInstance, this.favorites(), 'id', this.slotItemMap, (newMap) => {
        this.slotItemMap = newMap;
        this.updateSlottedItems();
      });
    }
  }

  async presentActionSheet(favorite: any) {
    this.idFavorite.set(favorite.item.id);
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
            this.toggleFavorite(favorite.item.id);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
          handler: () => {
            this.idFavorite.set(0);
          }
        },
      ],
    });

    await actionSheet.present();
  }

  async toggleFavorite(id: string) {
    this.favorites.update(current => current.filter(u => u.id !== id));
    await this.favoritesService._storage?.set('favorites', this.favorites());
    this.updateSwapy();
  }

}

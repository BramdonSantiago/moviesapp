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

  // ionViewWillEnter() {
  //   // await this.favoritesService.getFavorites();
  //   const saved = localStorage.getItem('swapyOrder');
  //   if (saved) {
  //     const order: number[] = JSON.parse(saved);

  //     // reordenamos favorites solo al inicio

  //     // let favs = await this.favoritesService._storage?.get('favorites') || [];
  //     // favs = order.map(id =>favs.find((f: any) => f.id === id)!);
  //     // await this.favoritesService._storage?.set('favorites', favs);
  //     // this.favorites.set(favs);

  //      this.favorites = order.map(id =>
  //       this.favorites.find(f => f.id === id)!
  //     );
  //   }

  //   // await this.favoritesService.resetStorage();

  //   if (this.favorites.length > 0) {
  //     setTimeout(() => {
  //       // if (this.swapyInstance) {
  //       //   this.swapyInstance.destroy?.();
  //       // }

  //       if (!this.swapyContainer?.nativeElement) {
  //         console.error('El contenedor no existe todavía');
  //         return;
  //       } else {
  //         console.log('Existe contenedor');
  //       }

  //       this.swapyInstance = createSwapy(this.swapyContainer.nativeElement, {
  //         animation: 'dynamic',
  //         swapMode: 'drop',
  //         manualSwap: true
  //       })
  //       this.swapyInstance.onSwap((event: any) => {
  //         const itemsDOM = this.swapyContainer.nativeElement.querySelectorAll('[data-swapy-item]');
  //         const newOrder = Array.from(itemsDOM).map((el: any) =>
  //           Number(el.getAttribute('data-swapy-item').replace('item-', ''))
  //         );
  //         setTimeout(() => {
  //           this.swapyInstance.update();
  //           this.reorderFavorites(newOrder);
  //         }, 1000);
  //       })

  //     }, 1000);
  //   }
  // }

  //   async reorderFavorites(newOrder: number[]) {
  //     // const favs = await this.favoritesService._storage?.get('favorites') || [];
  //     // const exists = favs.find((f: any) => f.id === newOrder);

  //     //  let updated;
  //     // if (exists) {
  //     //   updated = favs.filter((f: any) => f.id === newOrder);
  //     // }

  //     // await this.favoritesService._storage?.set('favorites', updated);
  //     // this.favorites.set(updated);
  //     localStorage.setItem('swapyOrder', JSON.stringify(newOrder));
  //   //   this.favorites.update(current =>
  //   //   newOrder.map(id => current.find(f => f.id === id)!)
  //   // );

  //   // let favs = await this.favoritesService._storage?.get('favorites') || [];
  //   //     let newFavs = newOrder.map(id =>favs.find((f: any) => f.id === id)!);
  //   //     await this.favoritesService._storage?.set('favorites', newFavs);
  //       // this.favorites.set(newFavs);

  //       // this.favorites.update(current =>
  //       //   current.filter(f => f.id !== favorite.id)
  //       // );

  // //       this.favorites = newOrder.map(id =>
  // //   this.favorites.find(f => f.id === id)!
  // // );

  //       //  console.log(await this.favoritesService._storage?.get('favorites') || []);

  //     this.swapyInstance.update();
  //     // console.log(await this.favoritesService._storage?.get('favorites') || []);
  //     // console.log(this.favorites());


  //     // if (this.favorites().length <= 0) {
  //     //   localStorage.clear();
  //     // }

  //   }

  async ionViewWillEnter() {
    await this.favoritesService.getFavorites();
    // await this.favoritesService.resetStorage();
    // const saved = localStorage.getItem('swapyOrder');
    // if (saved) {
    //   const order: any = JSON.parse(saved);
    //   if (order.length > 0) {
    //     // console.log(order);
    //     this.slotItemMap = order;
    //     this.updateSlottedItems();
    //   }
    // }

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

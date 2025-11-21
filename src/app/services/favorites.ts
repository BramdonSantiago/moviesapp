import { inject, Injectable, signal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class Favorites {
  storage = inject(Storage);
  _storage: Storage | null = null;
  favorites = signal<any[]>([]);

  constructor() {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const favs = await this._storage.get('favorites') || [];
    // this.favorites.set(favs);
    this.favorites.set(
      favs.map((f: any) => ({ 
        ...f, 
        id: String(f.id)
      }))
    );
  }

  async getFavorites() {
    // return (await this._storage?.get('favorites')) || [];
    const favs = await this._storage?.get('favorites') || [];
    // this.favorites.set(favs);
    this.favorites.set(
      favs.map((f: any) => ({ 
        ...f, 
        id: String(f.id)
      }))
    );
  }

  async toggleFavorite(movie: any) {
    const favs = await this._storage?.get('favorites') || [];
    const idMovie = String(movie.id);
    const exists = favs.find((f: any) => f.id === idMovie);
    
    // const movieAdd = {...movie, slot: String(movie.id), item: movie.title};
    // const movieAdd = {slot: String(movie.id), item: movie.title};

    let updated;
    if (exists) {
      updated = favs.filter((f: any) => f.id !== idMovie);
    } else {
      updated = [...favs, {...movie, id: String(movie.id)}];
    }

    await this._storage?.set('favorites', updated);
    this.favorites.set(updated);
  }

  isFavorite(id: any): boolean {
    const idMovie = String(id);
    return this.favorites().some(movie => movie.id === idMovie);
  }

  // async updateStorage() {
  //   const favs = await this._storage?.get('favorites') || [];
  //   const exists = favs.find((f: any) => f.id === movie.id);
  //     let updated;
  //   if (exists) {
  //     updated = favs.filter((f: any) => f.id !== movie.id);
  //   } else {
  //     updated = [...favs, movie];
  //   }

  //   await this._storage?.set('favorites', updated);
  //   this.favorites.set(updated);
  // }

  async resetStorage() {
    await this._storage?.clear();
    console.log('🔄 Storage limpiado por completo');
  }

}

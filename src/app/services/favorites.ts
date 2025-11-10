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
    this.favorites.set(favs);
    // console.log(this.favorites());
  }

  async getFavorites() {
    // return (await this._storage?.get('favorites')) || [];
    const favs = await this._storage?.get('favorites') || [];
    this.favorites.set(favs);
  }

  async toggleFavorite(movie: any) {
    const favs = await this._storage?.get('favorites') || [];
    const exists = favs.find((f: any) => f.id === movie.id);

    let updated;
    if (exists) {
      updated = favs.filter((f: any) => f.id !== movie.id);
    } else {
      updated = [...favs, movie];
    }

    await this._storage?.set('favorites', updated);
    this.favorites.set(updated);
  }

  isFavorite(id: number): boolean {
    return this.favorites().some(movie => movie.id === id);
  }

  // async resetStorage() {
  //   await this._storage?.clear();
  //   console.log('🔄 Storage limpiado por completo');
  // }

}

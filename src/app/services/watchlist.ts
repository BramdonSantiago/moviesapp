import { Injectable, inject, signal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class Watchlist {
  storage = inject(Storage);
  _storage: Storage | null = null;
  watchlist = signal<any[]>([]);

  constructor() {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const watch = await this._storage.get('watchlist') || [];
    this.watchlist.set(watch);
  }

  async getWatchList() {
    const watch = await this._storage?.get('watchlist') || [];
    this.watchlist.set(watch);
  }

  async toggleWatchList(movie: any) {
    const favs = await this._storage?.get('watchlist') || [];
    const exists = favs.find((f: any) => f.id === movie.id);

    let updated;
    if (exists) {
      updated = favs.filter((f: any) => f.id !== movie.id);
    } else {
      updated = [...favs, movie];
    }

    await this._storage?.set('watchlist', updated);
    this.watchlist.set(updated);
  }

  iswatchList(id: number): boolean {
    return this.watchlist().some(movie => movie.id === id);
  }

}

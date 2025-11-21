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
    this.watchlist.set(
      watch.map((f: any) => ({ 
        ...f, 
        id: String(f.id)
      }))
    );
  }

  async getWatchList() {
    const watch = await this._storage?.get('watchlist') || [];
    this.watchlist.set(
      watch.map((f: any) => ({ 
        ...f, 
        id: String(f.id)
      }))
    );
  }

  async toggleWatchList(movie: any) {
    const favs = await this._storage?.get('watchlist') || [];
    const idMovie = String(movie.id);
    const exists = favs.find((f: any) => f.id === idMovie);

    let updated;
    if (exists) {
      updated = favs.filter((f: any) => f.id !== idMovie);
    } else {
      updated = [...favs, {...movie, id: String(movie.id)}];
    }

    await this._storage?.set('watchlist', updated);
    this.watchlist.set(updated);
  }

  iswatchList(id: any): boolean {
    const idMovie = String(id);
    return this.watchlist().some(movie => movie.id === idMovie);
  }

  async resetStorage() {
    await this._storage?.clear();
    console.log('🔄 Storage limpiado por completo');
  }

}

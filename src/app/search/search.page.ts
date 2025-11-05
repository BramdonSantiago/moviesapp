import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonSearchbar, IonTitle, IonImg, IonIcon, IonSegment, IonSegmentButton, IonCol, IonGrid, IonRow, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';
import { Movies } from '../services/movies';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RouterModule, IonSearchbar, IonImg, IonSegment, IonTitle, IonIcon, IonSegmentButton, IonCol, IonGrid, IonRow, IonInfiniteScroll, IonInfiniteScrollContent, IonRefresher, IonRefresherContent]
})
export class SearchPage implements OnInit {
  moviesService = inject(Movies);
  moviesSearch = this.moviesService.moviesSearch;
  categories = this.moviesService.categories;
  selectedCategory = this.moviesService.selectedCategory;
  queryMovie: string = '';
  currentPage = this.moviesService.currentPage;
  totalPages = this.moviesService.totalPages;

  constructor() {
    addIcons({ star });
    // this.moviesService.getCategories();

    // effect(() => {
    //   if (this.categories().length > 0) {
    //     this.moviesService.updateCategory(this.currentPage());
    //   }
    // });
  }

  ngOnInit() {
    this.moviesService.getCategories();
    if (this.categories()) {
      setTimeout(() => {
        this.moviesService.updateCategory(this.currentPage());
      }, 1000);
    }
  }


  changeCategory($event: any) {
    const idCategory = $event.target.value;
    const category = this.categories().find(c => c.id === +idCategory);

    if (!category || this.moviesService.selectedCategory()?.id === category.id) {
      // console.log('⚠️ No hubo cambio de categoría');
      return;
    }
    this.moviesService.moviesSearch.set([]);
    this.resetCurrentPage();
    this.totalPages.set(1);
    this.moviesService.selectedCategory.set(category);
    this.moviesService.updateCategory(this.currentPage());
    this.queryMovie = '';
    // console.log('✅ Cambió a categoría:', category);
  }

  loadMoreMovies(event: InfiniteScrollCustomEvent) {
    // event.target.disabled = false;
    this.currentPage.update(v => v + 1);
    if (this.currentPage() < this.totalPages() && this.currentPage() <= 10) {
      console.log(this.currentPage());
      this.moviesService.updateCategory(this.currentPage());
    } else {
      // this.currentPage.set(1);
      // event.target.disabled = true;
    }
    setTimeout(() => {
      event.target.complete();
    }, 4000);
  }

  search(event: any) {
    this.resetCurrentPage();
    const target = event.target as HTMLIonSearchbarElement;
    this.queryMovie = target.value || '';
    // const query = this.queryMovie.toLocaleLowerCase();
    if (this.queryMovie != '') {
      this.moviesService.searchMovie(this.queryMovie);
    } else {
      this.moviesService.moviesSearch.set([]);
      this.moviesService.updateCategory(this.currentPage());
    }
  }

  resetCurrentPage() {
    this.currentPage.set(1);
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      this.moviesService.moviesSearch.set([]);
      this.resetCurrentPage();
      this.moviesService.getCategories();
      if (this.queryMovie != '') {
        this.moviesService.searchMovie(this.queryMovie);
        // console.log(this.queryMovie);
      } else {
        setTimeout(() => {
          this.moviesService.updateCategory(this.currentPage());
        }, 1000);
      }
      event.target.complete();
    }, 2000);
  }

}

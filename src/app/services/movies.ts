import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Movies {
  http = inject(HttpClient);
  categories = signal<any[]>([]);
  selectedCategory = signal<any | null>(null);
  moviesSearch = signal<any[]>([]);
  moviesTrendingToday = signal<any[]>([]);
  moviesTrendingWeek = signal<any[]>([]);
  moviesOnCinemas = signal<any[]>([]);
  moviesPopular = signal<any[]>([]);
  moviesTopRated = signal<any[]>([]);
  moviesUpcoming = signal<any[]>([]);
  moviesRelated = signal<any[]>([]);
  detailMovie = signal<any>(null);
  detailMovieVideo = signal<any>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  headers = new HttpHeaders(environment.headers);


  getCategories() {
    const endPoint = `/genre/movie/list`;

    this.http.get(`${environment.apiUrl}${endPoint}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.categories.set(response.genres);
        console.log(this.categories());
        if (response.genres.length > 0) {
          this.selectedCategory.set(response.genres[0]);
        }
        // console.log(this.selectedCategory());
      },
      error: (error) => {
        console.error('Error al obtener las categorias:', error);
      }
    });
  }

  updateCategory(page: number) {
    const endPoint = `/discover/movie?with_genres=${this.selectedCategory().id}&page=${page}`;

    this.http.get(`${environment.apiUrl}${endPoint}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        console.log(response);
        // this.moviesSearch.set(response.results);
        const newMoviesSearch = [...this.moviesSearch(), ...response.results];
        this.moviesSearch.set(newMoviesSearch);
        this.totalPages.set(response.total_pages);
        console.log(this.moviesSearch());
        // console.log(this.moviesSearch());
      },
      error: (error) => {
        console.error('Error al obtener peliculas de la categoría:', error);
      }
    });
  }

  searchMovie(query: string) {
    const endPoint = `/search/movie?query=${query}`;

    this.http.get(`${environment.apiUrl}${endPoint}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.moviesSearch.set(response.results);
        console.log(this.moviesSearch());
      },
      error: (error) => {
        console.error('Error al obtener películas:', error);
      }
    });
  }

  movieDetail(id: number) {
    const endPoint = `/movie/${id}`;
    const endpointVideo = `/movie/${id}/videos`;

    this.http.get(`${environment.apiUrl}${endPoint}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.detailMovie.set(response);
        // console.log(this.detailMovie());
      },
      error: (error) => {
        console.error('Error al obtener detalle pelicula:', error);
      }
    });
    this.http.get(`${environment.apiUrl}${endpointVideo}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.detailMovieVideo.set(response.results);
        // console.log(this.detailMovieVideo());
      },
      error: (error) => {
        console.error('Error al obtener detalle pelicula:', error);
      }
    });
  }

  getMoviesTrendingToday() {
    const endPoint = "/trending/movie/day";

    this.http.get(`${environment.apiUrl}${endPoint}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.moviesTrendingToday.set(response.results);
        console.log(this.moviesTrendingToday());
      },
      error: (error) => {
        console.error('Error al obtener peliculas tendencia HOY:', error);
      }
    });
  }

  getMoviesTrendingWeek() {
    const endPoint = "/trending/movie/week";

    this.http.get(`${environment.apiUrl}${endPoint}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.moviesTrendingWeek.set(response.results);
        // console.log(this.moviesTrendingWeek());
      },
      error: (error) => {
        console.error('Error al obtener peliculas tendencia HOY:', error);
      }
    });
  }

  getMoviesOnCinemas() {
    const endPoint = "/movie/now_playing?region=MX";

    this.http.get(`${environment.apiUrl}${endPoint}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.moviesOnCinemas.set(response.results);
        console.log("Peliculas en cines: ", this.moviesOnCinemas());
      },
      error: (error) => {
        console.error('Error al obtener peliculas en cines:', error);
      }
    });
  }

  getMoviesPopular() {
    const endPoint = "/movie/popular";

    this.http.get(`${environment.apiUrl}${endPoint}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.moviesPopular.set(response.results);
        // console.log(this.moviesTrendingWeek());
      },
      error: (error) => {
        console.error('Error al obtener peliculas tendencia HOY:', error);
      }
    });
  }

  getMoviesTopRated() {
    const endPoint = "/movie/top_rated";

    this.http.get(`${environment.apiUrl}${endPoint}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.moviesTopRated.set(response.results);
        // console.log(this.moviesTrendingWeek());
      },
      error: (error) => {
        console.error('Error al obtener peliculas tendencia HOY:', error);
      }
    });
  }

  getMoviesUpcoming() {
    const endPoint = "/movie/upcoming";

    this.http.get(`${environment.apiUrl}${endPoint}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.moviesUpcoming.set(response.results);
        console.log("Peliculas Upcoming: ", this.moviesUpcoming());
      },
      error: (error) => {
        console.error('Error al obtener peliculas Upcoming:', error);
      }
    });
  }

  getMoviesRelated(idMovie: number) {
    const endPoint = `/movie/${idMovie}/recommendations`;

    this.http.get(`${environment.apiUrl}${endPoint}`, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.moviesRelated.set(response.results);
        // console.log("Peliculas Related: ", this.moviesRelated());
      },
      error: (error) => {
        console.error('Error al obtener peliculas Related:', error);
      }
    });
  }
}

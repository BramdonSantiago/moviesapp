import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonButton, IonIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieDetailPage implements OnInit {
  peliculas: any = [
    {
      "id": 1,
      "nombre": "Spider-Man",
      "año": 2002,
      "imagen": "https://image.tmdb.org/t/p/w500/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg"
    },
    {
      "id": 2,
      "nombre": "GoldenEye",
      "año": 1995,
      "imagen": "https://i.ebayimg.com/00/s/MTYwMFgxMDc3/z/UR8AAOSwHVpjasH9/%24_57.JPG?set_id=880000500F"
    },
    {
      "id": 3,
      "nombre": "The Dark Knight",
      "año": 2008,
      "imagen": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },
    {
      "id": 4,
      "nombre": "Interstellar",
      "año": 2014,
      "imagen": "https://m.media-amazon.com/images/I/91vIHsL-zjL.jpg"
    },
    {
      "id": 5,
      "nombre": "Avatar",
      "año": 2009,
      "imagen": "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
    },
    {
      "id": 6,
      "nombre": "The Matrix",
      "año": 1999,
      "imagen": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
    },
    {
      "id": 7,
      "nombre": "Gladiator",
      "año": 2000,
      "imagen": "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"
    },
    {
      "id": 8,
      "nombre": "The Lord of the Rings: The Fellowship of the Ring",
      "año": 2001,
      "imagen": "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg"
    },
    {
      "id": 9,
      "nombre": "Avengers: Endgame",
      "año": 2019,
      "imagen": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
    },
  ]

  constructor() {
    addIcons({ star });
  }

  ngOnInit() {
  }

}

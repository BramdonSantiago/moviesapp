import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonBackButton, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
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
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonButton, IonIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieDetailPage implements OnInit {
  pelicula: any;

  peliculas = [
    {
      id: 1,
      nombre: "Spider-Man",
      year: 2002,
      imagen: "https://image.tmdb.org/t/p/w500/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
      calificacion: 4.2,
      duracion: 121,
      genero: "Acción / Superhéroes",
      descripcion: "Un joven obtiene habilidades sobrehumanas después de ser mordido por una araña genéticamente modificada y debe enfrentarse al malvado Duende Verde para proteger Nueva York."
    },
    {
      id: 2,
      nombre: "GoldenEye",
      year: 1995,
      imagen: "https://i.ebayimg.com/00/s/MTYwMFgxMDc3/z/UR8AAOSwHVpjasH9/%24_57.JPG?set_id=880000500F",
      calificacion: 4.0,
      duracion: 130,
      genero: "Acción / Espionaje",
      descripcion: "El agente James Bond debe detener a un exagente británico que planea usar un arma satelital para destruir la economía mundial."
    },
    {
      id: 3,
      nombre: "The Dark Knight",
      year: 2008,
      imagen: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      calificacion: 4.9,
      duracion: 152,
      genero: "Acción / Crimen / Superhéroes",
      descripcion: "Batman enfrenta su mayor desafío cuando el Joker desata el caos en Gotham City, poniendo a prueba los límites de la justicia y la moral."
    },
    {
      id: 4,
      nombre: "Interstellar",
      year: 2014,
      imagen: "https://m.media-amazon.com/images/I/91vIHsL-zjL.jpg",
      calificacion: 4.8,
      duracion: 169,
      genero: "Ciencia Ficción / Drama",
      descripcion: "Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad mientras la Tierra enfrenta su extinción."
    },
    {
      id: 5,
      nombre: "Avatar",
      year: 2009,
      imagen: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
      calificacion: 4.3,
      duracion: 162,
      genero: "Ciencia Ficción / Aventura",
      descripcion: "En el exuberante mundo alienígena de Pandora, un exmarine humano se debate entre seguir órdenes militares o proteger a la raza nativa Na'vi."
    },
    {
      id: 6,
      nombre: "The Matrix",
      year: 1999,
      imagen: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      calificacion: 4.8,
      duracion: 136,
      genero: "Ciencia Ficción / Acción",
      descripcion: "Un hacker descubre que el mundo que conoce es una simulación creada por máquinas y se une a la rebelión para liberar a la humanidad."
    },
    {
      id: 7,
      nombre: "Gladiator",
      year: 2000,
      imagen: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
      calificacion: 4.7,
      duracion: 155,
      genero: "Acción / Drama / Histórico",
      descripcion: "Un general romano traicionado se convierte en gladiador para vengar la muerte de su familia y enfrentarse al corrupto emperador que lo destruyó."
    },
    {
      id: 8,
      nombre: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
      imagen: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
      calificacion: 4.9,
      duracion: 178,
      genero: "Fantasía / Aventura",
      descripcion: "Un joven hobbit debe emprender una peligrosa misión para destruir un anillo maligno que puede condenar al mundo si cae en las manos equivocadas."
    },
    {
      id: 9,
      nombre: "Avengers: Endgame",
      year: 2019,
      imagen: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      calificacion: 4.8,
      duracion: 181,
      genero: "Acción / Superhéroes / Ciencia Ficción",
      descripcion: "Después del devastador chasquido de Thanos, los Vengadores restantes deben unirse para intentar revertir el desastre y salvar el universo."
    }
  ];


  constructor(private route: ActivatedRoute) {
    addIcons({ star });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pelicula = this.peliculas.find(pelicula => pelicula.id === id);
  }

}

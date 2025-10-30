import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonSearchbar, IonTitle, IonImg, IonIcon, IonSegment, IonSegmentButton, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RouterModule, IonSearchbar, IonImg, IonSegment, IonTitle, IonIcon, IonSegmentButton, IonCol, IonGrid, IonRow]
})
export class SearchPage implements OnInit {
  peliculas = [
    {
      id: 1,
      nombre: "Spider-Man",
      year: 2002,
      imagen: "assets/img/spiderman.webp",
      calificacion: 4.2,
      duracion: 121,
      genero: "Acción / Superhéroes",
      descripcion: "Un joven obtiene habilidades sobrehumanas después de ser mordido por una araña genéticamente modificada y debe enfrentarse al malvado Duende Verde para proteger Nueva York."
    },
    {
      id: 2,
      nombre: "GoldenEye",
      year: 1995,
      imagen: "assets/img/007goldeneye.jpeg",
      calificacion: 4.0,
      duracion: 130,
      genero: "Acción / Espionaje",
      descripcion: "El agente James Bond debe detener a un exagente británico que planea usar un arma satelital para destruir la economía mundial."
    },
    {
      id: 3,
      nombre: "The Dark Knight",
      year: 2008,
      imagen: "assets/img/batman.webp",
      calificacion: 4.9,
      duracion: 152,
      genero: "Acción / Crimen / Superhéroes",
      descripcion: "Batman enfrenta su mayor desafío cuando el Joker desata el caos en Gotham City, poniendo a prueba los límites de la justicia y la moral."
    },
    {
      id: 4,
      nombre: "Interstellar",
      year: 2014,
      imagen: "assets/img/interstellar.jpg",
      calificacion: 4.8,
      duracion: 169,
      genero: "Ciencia Ficción / Drama",
      descripcion: "Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad mientras la Tierra enfrenta su extinción."
    },
    {
      id: 5,
      nombre: "Avatar",
      year: 2009,
      imagen: "assets/img/avatar.webp",
      calificacion: 4.3,
      duracion: 162,
      genero: "Ciencia Ficción / Aventura",
      descripcion: "En el exuberante mundo alienígena de Pandora, un exmarine humano se debate entre seguir órdenes militares o proteger a la raza nativa Na'vi."
    },
    {
      id: 6,
      nombre: "The Matrix",
      year: 1999,
      imagen: "assets/img/matrix.webp",
      calificacion: 4.8,
      duracion: 136,
      genero: "Ciencia Ficción / Acción",
      descripcion: "Un hacker descubre que el mundo que conoce es una simulación creada por máquinas y se une a la rebelión para liberar a la humanidad."
    },
    {
      id: 7,
      nombre: "Gladiator",
      year: 2000,
      imagen: "assets/img/gladiator.webp",
      calificacion: 4.7,
      duracion: 155,
      genero: "Acción / Drama / Histórico",
      descripcion: "Un general romano traicionado se convierte en gladiador para vengar la muerte de su familia y enfrentarse al corrupto emperador que lo destruyó."
    },
    {
      id: 8,
      nombre: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
      imagen: "assets/img/anillos.jpg",
      calificacion: 4.9,
      duracion: 178,
      genero: "Fantasía / Aventura",
      descripcion: "Un joven hobbit debe emprender una peligrosa misión para destruir un anillo maligno que puede condenar al mundo si cae en las manos equivocadas."
    },
    {
      id: 9,
      nombre: "Avengers: Endgame",
      year: 2019,
      imagen: "assets/img/avengers.jpg",
      calificacion: 4.8,
      duracion: 181,
      genero: "Acción / Superhéroes / Ciencia Ficción",
      descripcion: "Después del devastador chasquido de Thanos, los Vengadores restantes deben unirse para intentar revertir el desastre y salvar el universo."
    }
  ];

  constructor() { 
    addIcons({ star });
  }

  ngOnInit() {
  }

}

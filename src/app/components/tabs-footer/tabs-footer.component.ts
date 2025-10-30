import { Component, OnInit } from '@angular/core';
import { IonIcon, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, searchOutline, heartOutline, playCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs-footer',
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs],
  templateUrl: './tabs-footer.component.html',
  styleUrls: ['./tabs-footer.component.scss'],
})
export class TabsFooterComponent  implements OnInit {

  constructor() { 
    addIcons({ homeOutline, searchOutline, heartOutline, playCircleOutline });
  }

  ngOnInit() {}


}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HousingModel } from '../models/housing.model';
import { GetAllHousingLocations } from './housing-location.actions';
import { Select, Store, select } from '@ngxs/store';
import { HousingLocationSelectors } from './housing-location.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { HousingLocationState } from './housing-location.state';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule, RouterLink, RouterOutlet],
  template: `
  <section class="listing">
    <img
      class="listing-photo"
      [src]="housingLocation.photo"
      alt="Exterior photo of {{ housingLocation.name }}"
      crossorigin
    />
    <h2 class="listing-heading">{{ housingLocation.name }}</h2>
    <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
    <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
  </section>
  
`,
  styleUrl: './housing-location.component.scss'
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingModel;


  constructor(private store: Store){
  }



  ngOnInit(): void {
    this.GetHouses()
  }

  
  @Select(HousingLocationState)
  houses!: Observable<HousingModel[]>;
  GetHouses(){
    this.store.dispatch(new GetAllHousingLocations())
  }  
  
}

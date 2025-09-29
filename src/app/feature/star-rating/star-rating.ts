import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-star-rating',
  imports: [NgbModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss'
})
export class StarRating {

  constructor() {}

  @Input() rating: any;
  @Input() isReadOnly: Boolean = false;

}

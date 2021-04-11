import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/core/models/models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() data: Product;
  @Output() counter = new EventEmitter<{}>();
  count: number = 0;
  constructor() {}

  changeCount(type) {
    type == 'increase' ? this.count++ : this.count--;
    const payload = { type: type, item: { ...this.data, count: this.count } };
    this.counter.emit(payload);
  }
}

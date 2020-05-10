import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {

  @Output() createMagnet = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onClick()
  {
    this.createMagnet.emit();
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMagnet } from 'src/app/files/magnets';
import { MagnetsService } from '../magnets.service';

@Component({
  selector: 'app-magnet',
  templateUrl: './magnet.component.html',
  styleUrls: ['./magnet.component.scss']
})
export class MagnetComponent implements OnInit {

  @Input() magnet: IMagnet;
  @Output() editMagnet: EventEmitter<IMagnet> = new EventEmitter<IMagnet>();
  @Output() deleted: EventEmitter<IMagnet> = new EventEmitter<IMagnet>();
  constructor(private magnetService: MagnetsService) { }

  ngOnInit() {
  }

  onEditMagnet()
  {
    this.editMagnet.emit(this.magnet);
  }
  onDeleteMagnet()
  {
    this.deleted.emit(this.magnet);
  }
}

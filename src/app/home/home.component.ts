import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MagnetsService } from '../magnets/magnets.service';
import { IMagnet } from '../files/magnets';
import { CategoriesService } from './categories.service';
import { ICat } from '../files/categories';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{


  @Output() magnets;
  creatingMagnet = false;
  notification: { warning: boolean, show: boolean, magnet: IMagnet, message: string } = {
    warning: false,
    show: false,
    magnet: null,
    message: null
  };
  deletedMagnet: IMagnet;
  timeout;
  constructor(private magnetService: MagnetsService, private categoriesService: CategoriesService) { }

  ngOnInit()
  {
    this.magnetService.getAllMagnets().subscribe({
      next: (magnets: Array<IMagnet>) =>
      {
        this.magnets = magnets ? magnets.filter((magnet) => { return magnet.isPinned }) : [];
      },
      complete: () =>
      {
        if (this.magnets)
        {
          this.magnets.forEach(magnet =>
          {
            this.categoriesService.getOne(magnet.category).subscribe({
              next: (cat:ICat) => { magnet.categoryName = cat.name }
            })

          });
        }
      }
    });
  }

  showNotification($event, added: boolean)
  {
    if ($event)
    {
      this.notification.show = true;
      this.notification.warning = added ? false : true;
      this.notification.message = added ? "Magnet added successfully" : "Magnet deleted successfully";

      this.timeout = setTimeout(() =>
      {
        this.notification.show = false;
      }, 3000);
    }

  }
  hideMagnetCreationForm()
  {
    this.creatingMagnet = false;
  }

  showMagnetCreationForm()
  {
    this.creatingMagnet = true;
  }

  createMagnet($event)
  {
    this.magnets.unshift($event);
  }

  onDeletedMagnet($event: IMagnet)
  {
    this.magnetService.deleteMagnet($event.id).subscribe({
      next: (res) =>
      {
        console.log("magnet deleted by service", res);
      },
      complete: () =>
      {
        this.deletedMagnet = $event;
        this.magnets = this.magnets.filter(m => { return m.id != $event.id });
      },
      error: () =>
      {
        alert("There has been an error");
      }

    })
  }

  undoDeletion()
  {
    this.magnets.unshift(this.deletedMagnet);
    this.notification.show = false;
    this.magnetService.createMagnet(this.deletedMagnet).subscribe({
      next: (magnet) => { this.magnets.unshift(magnet); console.log("recreated magnet", magnet) }
    });
    this.deletedMagnet = null;
  }
  onCreatedMagnet($event: IMagnet)
  {
    if ($event.isPinned)
    {
      this.magnets.unshift($event);
    }
    this.showNotification($event, true);
  }

}

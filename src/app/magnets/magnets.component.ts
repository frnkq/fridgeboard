import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMagnet } from '../files/magnets';
import { MagnetsService } from './magnets.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { ICat } from '../files/categories';
import { CategoriesService } from '../home/categories.service';

@Component({
  selector: 'app-magnets',
  templateUrl: './magnets.component.html',
  styleUrls: ['./magnets.component.scss']
})
export class MagnetsComponent implements OnInit {

  @Input() magnets: Array<IMagnet>;
  magnet: IMagnet;
  magnetCategory: ICat;
  theDeletedMagnet: IMagnet = null;
  editingMagnet:boolean = false;
  @Output() editMagnet:EventEmitter<IMagnet> = new EventEmitter<IMagnet>();
  @Output() deletedMagnet:EventEmitter<IMagnet> = new EventEmitter<IMagnet>();
  @Output() createdMagnet:EventEmitter<IMagnet> = new EventEmitter<IMagnet>();
  timeout;
  notification:{warning:boolean, show:boolean, magnet:IMagnet, message: string} = {
    warning:false,
    show: false,
    magnet:null,
    message: null
  };
  constructor(private magnetsService:MagnetsService, private categoryService: CategoriesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      if(params.get("id"))
      {
      this.magnetsService.getOne(params.get("id")).subscribe({
        next: (magnet:IMagnet)=>{
          if(magnet.id != null)
          {
            this.magnet = magnet;
            this.categoryService.getOne(magnet.category as number).subscribe({
              next: (cat:ICat)=>{
                this.magnet.categoryName = cat.name;
              }
            })
          }
        }
      })

      }
    });
  }

  onEditMagnet($event)
  {
    this.editingMagnet = true;
    this.magnet = $event;
    this.editMagnet.emit($event);
  }

  onDeletedMagnet($event:IMagnet)
  {

    this.showNotification($event, false);
    this.magnetsService.deleteMagnet($event.id).subscribe({
      next: (res)=>{
        if(this.magnet)
        {
        }
      }
    })
    this.theDeletedMagnet = $event;
    this.deletedMagnet.emit($event);
  }

  undoDeletion() {
    this.notification.show = false;
    let deletedMagnet;
    if(this.theDeletedMagnet.categoryName)
      delete this.theDeletedMagnet.categoryName;
    this.magnetsService.createMagnet(this.theDeletedMagnet).subscribe({
      next:(magnet:IMagnet)=>{deletedMagnet = magnet},
      complete:()=>{
        this.deletedMagnet = null;
        this.createdMagnet.emit(deletedMagnet);
        clearTimeout(this.timeout);
      }
    });
   console.log("magnet to re add", this.theDeletedMagnet);
    this.theDeletedMagnet = null;
  }

  closeEditMagnetForm()
  {
    this.editingMagnet = false;
  }

  showNotification($event, added:boolean)
  {
    if($event)
    {
      this.notification.show = true;
      this.notification.warning = added ? false : true;
      this.notification.message = added ? "Magnet added successfully"  : "Magnet deleted successfully";

      this.timeout = setTimeout(()=>{
        this.notification.show = false;
        this.router.navigateByUrl("/");
      }, 3500);
    }

  }
}

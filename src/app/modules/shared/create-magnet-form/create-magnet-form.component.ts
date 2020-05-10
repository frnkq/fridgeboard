import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MagnetsService } from 'src/app/magnets/magnets.service';
import { IMagnet } from 'src/app/files/magnets';
import { CategoriesService } from '../../../home/categories.service';
import { ICat } from 'src/app/files/categories';

@Component({
  selector: 'app-create-magnet-form',
  templateUrl: './create-magnet-form.component.html',
  styleUrls: ['./create-magnet-form.component.scss']
})
export class CreateMagnetFormComponent implements OnInit
{

  DEFAULT_CATEGORY = "Uncategorized"; //Uncategorized;
  categories: Array<ICat>;
  @Output() exit = new EventEmitter();
  @Input() magnet: IMagnet;
  magnetCategory: ICat;
  selectedIcon: string;
  @Output() magnetCreated: EventEmitter<IMagnet> = new EventEmitter<IMagnet>();
  constructor(private formBuilder: FormBuilder, private magnetService: MagnetsService, private categoryService: CategoriesService) { }

  magnetForm = this.formBuilder.group({
    title: new FormControl('', [
      Validators.required
    ]),
    content: new FormControl('', [

    ]),
    isPinned: new FormControl(false, []),
    category: new FormControl('', [])
  });
  ngOnInit()
  {
    this.categoryService.getAllCategories().subscribe({
      next: (cats: Array<ICat>) =>
      {
        this.categories = cats;
        this.categories.forEach(c =>
        {
          if (this.magnet)
          {
            if (c.id == this.magnet.category)
            {
              this.magnetCategory = c;
              return true;
            }

          }
        })
      },
    });

    if (this.magnet)
    {
      this.magnetForm.controls.title.setValue(this.magnet.title);
      this.magnetForm.controls.content.setValue(this.magnet.content);
      this.magnetForm.controls.isPinned.setValue(this.magnet.isPinned);
    }
  }

  exitCreation(message?: string)
  {
    this.exit.emit(message);
  }

  upsertMagnet()
  {
    let magnet: IMagnet | any = {};

    let date = new Date();
    let title = this.magnetForm.controls.title.value;
    let content = this.magnetForm.controls.content.value;

    magnet.id = (this.magnet) ? this.magnet.id : null;
    magnet.createdAt = (this.magnet) ? this.magnet.createdAt : date.getDate() + '-' + date.getMonth() + "-" + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    magnet.modifiedAt = date.getDate() + '-' + date.getMonth() + "-" + date.getFullYear();
    magnet.isPinned = this.magnetForm.controls.isPinned.value; //TODO add checkbox
    magnet.title = title;
    magnet.content = [content];
    magnet.icon = this.selectedIcon ? this.selectedIcon : null;
    magnet.category = this.magnet ? this.magnet.category : this.magnetForm.controls.category.value;
    //TODO add icon

    let categoryId = this.magnetCategory ? this.magnetCategory.id : this.magnetForm.controls.category.value.id;
    console.log(magnet);
    let createdMagnet: IMagnet = null;
    this.magnetService.createMagnet(magnet).subscribe({
      next: (magnet: IMagnet) => { createdMagnet = magnet },
      complete: () =>
      {
        this.exitCreation(); this.magnetCreated.emit(createdMagnet)
      }
    });
  }

  onSelectedIcon($event)
  {
    this.selectedIcon = $event;
  }
}

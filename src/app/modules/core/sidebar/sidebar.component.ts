import { Component, OnInit } from '@angular/core';
import { MagnetsService } from '../../../magnets/magnets.service';
import { CategoriesService } from 'src/app/home/categories.service';
import { IMagnet } from 'src/app/files/magnets';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit
{

  categories = []; //this.categoryService.getAllCategories();
  magnets = [];
  constructor(private magnetService: MagnetsService, private categoryService: CategoriesService) { }

  ngOnInit()
  {


    this.categoryService.getAllCategories().subscribe({
      next: (categories) =>
      {
        this.categories = categories as any;
      },
      complete: () =>
      {
        this.magnetService.getAllMagnets().subscribe({
          next: (magnets) =>
          {
            this.magnets = magnets as any;
          },
          complete: () =>
          {
            this.categories.forEach(cat =>
            {
              cat.magnets = [];
              if (this.magnets)
              {
                this.magnets.forEach(mag =>
                {
                  if (cat.id == mag.category)
                  {
                    cat.magnets.push(mag);
                  }
                })

              }
            })
          }
        });
      }

    });
  }

}

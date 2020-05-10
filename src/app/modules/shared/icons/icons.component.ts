import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit
{

  icons:Array<String>=[];
  @Output() selectedIcon:EventEmitter<String> = new EventEmitter<String>();
  theSelectedIcon:String;
  constructor() { }

  ngOnInit()
  {
    for (var prop in fa)
    {
      if (Object.prototype.hasOwnProperty.call(fa, prop))
      {
        let name = prop.substr(2, prop.length - 1);
        name = name.replace(/([a-z])([A-Z])/g,"$1-$2");
        name = name.toLowerCase();
        this.icons.push(name);
      }
    }
        console.log(this.icons.length);
  }

  onSelectIcon(icon:string)
  {
    this.theSelectedIcon=icon;
    console.log(this.theSelectedIcon)
    this.selectedIcon.emit(this.theSelectedIcon);
  }

}

import { Component, OnInit } from '@angular/core';
import {faBars, faPlus} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  fabars = faBars
  faPlus = faPlus
  isShow = false
  constructor() {}

  hadnleThis(){
    this.isShow = true
    console.log(this.isShow)
  }

}

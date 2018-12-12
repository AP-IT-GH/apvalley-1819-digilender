import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locatie',
  templateUrl: './locatie.component.html',
  styleUrls: ['./locatie.component.scss']
})
export class LocatieComponent implements OnInit {

  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  goTo(pad:String):void{
    this.router.navigate(['/'+ pad], { relativeTo: this.route });
  }

}

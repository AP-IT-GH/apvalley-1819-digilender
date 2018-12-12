import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scherm',
  templateUrl: './scherm.component.html',
  styleUrls: ['./scherm.component.scss']
})
export class SchermComponent implements OnInit {

  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  goTo(pad:String):void{
    this.router.navigate(['/'+ pad], { relativeTo: this.route });
  }
}

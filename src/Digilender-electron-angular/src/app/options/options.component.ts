import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  
  constructor(private modalService:ModalService) { }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
    //console.log("open modal "+ id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

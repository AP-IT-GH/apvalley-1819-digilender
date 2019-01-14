import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notesProm;
  usersProm;
  users;
  resourceIdDropdown;
  noteText;

  constructor(private router: Router, private route: ActivatedRoute, public dServ: DatabaseService, public mServ: ModalService) { 
    this.dServ.getNotes().then((notes)=>{console.log(notes)});
    this.usersProm = this.dServ.getUsers(undefined)
    .then(users => {
      let tempUsers = []
      console.log("filling users array");
      console.log(users);
      // for (let user of users) {
      //  tempUsers[user.id] = user;
      //}
      this.users = users;
    }).then(() => {
      console.log(this.users);
      this.notesProm = this.dServ.getNotes();
    });
  }

  ngOnInit() {
  }
  
  deleteNote(note) {
    this.dServ.deleteNote(note)
    .then( () => {
      this.notesProm = this.dServ.getNotes();
    });
  }

  openAdd() {
    this.mServ.open("add-note");
  }

  closeAdd() {
    this.mServ.close("add-note");
  }

  confirmAdd() {
    console.log("confirm add");
    console.log(this.resourceIdDropdown);
    console.log(this.noteText);
    if(this.noteText && this.resourceIdDropdown) {
      this.dServ.addNote({
        id: undefined,
        resourceId: this.resourceIdDropdown,
        text: this.noteText
      }).then(() => { 
        this.notesProm = this.dServ.getNotes();
      });
      this.resourceIdDropdown = undefined;
      this.noteText = undefined;
      this.closeAdd();
    }
  }
  
  findUser(resourceId: number){
    console.log("finding user");
    console.log(resourceId);
    console.log(this.users);
    let tmp = this.users.find(
      (user) => {
        return (user.id == resourceId);
    });
    console.log(tmp);
    return tmp;
  }
    
  neverCalled() {
    let note = undefined;
    this.dServ.getNotes();
    this.dServ.addNote(note);
    this.dServ.deleteNote(note);
  }
}



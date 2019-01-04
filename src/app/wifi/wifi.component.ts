import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }



  dummySSIDs: Section[] = [
    {
      name: 'WiFi-2.4-1R82',
      signal_dB: -40
    },
    {
      name: 'telenet-32FE1',
      signal_dB: -50
    },
    {
      name: 'TelenetWiFree',
      signal_dB: -60
    },
    {
      name: 'telenet-55ST2',
      signal_dB: -70
    },
    {
      name: 'TELENETHOMESPOT',
      signal_dB: -80
    }
  ]

}


export interface Section {
  name: string;
  signal_dB: number;
}

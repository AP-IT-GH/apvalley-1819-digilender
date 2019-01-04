import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSliderModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatStepperModule
} from '@angular/material';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatTabsModule,
        MatFormFieldModule,
        MatSliderModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatStepperModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatTabsModule,
        MatFormFieldModule,
        MatSliderModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatStepperModule
    ],
})

export class MaterialModule { }
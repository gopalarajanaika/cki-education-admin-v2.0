import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from '../image-cropper/image-cropper.module';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  exports:[
    FormComponent
  ]
})
export class FormModule { }

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../shared/services/common/common.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  @Input() formData: any = {};
  fb = new FormBuilder();
  @Output() commonEvent = new EventEmitter<any>();
  fileList: any = [];
  isFormSubmitted: boolean = false;

  config: any = {
    ImageName: 'img.jpg',
    AspectRatios: ["1:1"],
    ImageUrl: '',
    ImageType: 'image/jpeg'
  }
  dpImage: any;
  currentFile: string = '';
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.createFormFields();
  }

  get fc() { return this.form.controls; }

  createFormFields() {
    let elements = {};
    if (this.formData.elements && this.formData.elements.length > 0) {
      this.formData.elements.forEach(element => {
        if (element.type === 'file') {
          elements[element.name] = ['', this.addValidators(element)];
          element.fileSelected = false;
        } else if (element.type === 'dropdown') {
          element['pageIndex'] = 0;
          element['pageSize'] = 20;
          elements[element.name] = [element.value, this.addValidators(element)];
          if (element.searchOption) {
            elements[element.name + 'SearchTerm'] = '';
          }
        } else if (element.type === 'formGroup') {
          let childElements = {};
          element.elements.forEach(childElement => {
            childElements[childElement.name] = [childElement.value, this.addValidators(element)];
          });
          elements[element.name] = this.fb.group(childElements);
        } else {
          elements[element.name] = [element.value, this.addValidators(element)];
          if (element?.addonElement) {
            elements[element?.addonElement.name] = [element?.addonElement.value, this.addValidators(element?.addonElement)];
          }
        }
      });
    }
    this.form = this.fb.group(elements);
  }

  private addValidators(element: any): any {
    let validators: any = [];
    if (element.required && !element.hidden)
      validators.push(Validators.required);
    if (element.email || element.type === 'email')
      validators.push(Validators.email);
    if (element.maxlength)
      validators.push(Validators.maxLength(element.maxlength));

    return validators;
  }

  updateValidators(controls: any = []) {
    controls.forEach(element => {
      this.form.get(element.name)?.setValidators(this.addValidators(element));
      this.form.get(element.name)?.updateValueAndValidity();
    });
  }

  fileChangeEvent(event: any, element: any): void {
    if (event.target.files.length) {
      let file = event.target.files[0];
      element.fileSelected = true;
      file.label = element.label;
      file.docName = element.name;
      file.fileName = file.name;
      file.fileType = file.type;
      file.fileSize = file.size;
      file.uploaded = false;
      let index = this.fileList.findIndex(x => x.fileName === element.name);
      if (index === -1) {
        this.fileList.push(file);
        this.form.value[element.name] = file;
        this.form.get(element.name)?.setValue(file);
      } else {
        this.fileList[index] = file;
        this.form.value[element.name] = file;
        this.form.get(element.name)?.setValue(file);
      }
    }
  }

  setImageToTag(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.config.ImageUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  resetCroppedImage(name) {
    this.config.ImageUrl = null;
    this.currentFile = name;
  }

  getEditedFile(image: any) {
    if (image) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.dpImage = event.target.result;
      }
      reader.readAsDataURL(image);
    }
    this.form.value[this.currentFile] = image;
    this.form.get(this.currentFile)?.setValue(image);
  }


  submit() {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      this.commonEvent.emit({ eventName: (this.formData.eventName || 'submitForm'), parameter: this.form.value });
      this.isFormSubmitted = false;
    } else {
      let alert = { severity: 'danger', message: "Please complete the form" };
      this.commonService.createAlertMessage(alert);
    }
  }

  resetForm() {
    this.isFormSubmitted = false;
    this.createFormFields();
  }

  commonEventEmitter(args: any = {}) {
    if (args && args.parameter && args.parameter.element && args.parameter.element.parameters && args.parameter.element.parameters.length > 0) {
      args.parameter.element.parameters.forEach(x => {
        args.parameter[x] = this.form.get(x)?.value;
      });
    }
    this.commonEvent.emit(args);
  }

}

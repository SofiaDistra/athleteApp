import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {countries} from "../countries";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  name: string = '';
  birthday: Date = new Date();
  formValid: boolean = true;
  maxDate: Date = new Date();
  maxDateStr: string = '';
  country: string = '';
  countries: any[] = [];
  height: string = '';
  image: File = new File([],'');
  imageString: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18 );
    this.maxDateStr = this.maxDate.toJSON().split('T')[0];
    this.countries = countries;

    if (localStorage.getItem('init') != null) {
      // redirect to main
      this.router.navigate(['/home']);
    }
  }

  submitInitialData() {
    if (this.validateForm()) {
      localStorage.setItem('name', this.name);
      localStorage.setItem('birthday', this.birthday.toString());
      localStorage.setItem('country', this.country);
      localStorage.setItem('height', this.height);
      localStorage.setItem('init', 'true');

      this.router.navigate(['/home']);

    }
  }

  validateForm(): boolean {
    if (this.name != '' && this.country != '' && this.height != '') {
      this.formValid = true;
      return true;
    } else {
      this.formValid = false;
    }

    return false;
  }

  onFileChanged(event: any) {
    this.image = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = function () {
      if(reader.result) {
        localStorage.setItem('imgData', reader.result.toString());
      }
    };
  }
}

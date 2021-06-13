import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataRow} from "../data-row";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: DataRow[] = [];
  asc: boolean = true;
  colsShow: boolean[] = [];
  name: any;
  age: number = 0;
  country: any = '';
  height: any = '';
  years: number[] = [];
  newRow: DataRow = new DataRow();
  bio: any = '';
  image: any = '';
  totalWins: number = 0;
  totalLosses: number = 0;
  mostGS: number = 0;
  mostGSYear: number = 0;
  resultFilter: string = '';
  yearFilter: string = '';
  tournFilter: string = '';
  opponFilter: string = '';
  scoreFilter: string = '';

  constructor(private router: Router) {
    for (let i = 0; i < 5; i++) {
      this.colsShow[i] = true;
    }
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.country = localStorage.getItem('country');
    this.height = localStorage.getItem('height');
    this.bio = localStorage.getItem('bio');
    this.image = localStorage.getItem('imgData');
    const date = localStorage.getItem('birthday');

    if(date != null) {
      const birthday = new Date(date);
      this.age = new Date().getFullYear() - birthday.getFullYear();
    }

    const today = new Date();
    let year = today.getFullYear();
    for(let i=0; i<100; i++) {
      this.years.push(year);
      year--;
    }

    this.data = JSON.parse(localStorage.getItem("data") || "[]");

    this.calculateTotals();
    this.calculateMostGS();
  }

  calculateTotals() {
    this.totalWins = 0;
    this.totalLosses = 0;
    for(let i=0; i<this.data.length; i++) {
      if(this.data[i].result == 'Win') this.totalWins++;
      else this.totalLosses++;
    }
  }

  calculateMostGS() {
    let map = new Map();
    for(let i=0; i<this.data.length; i++) {
      if(map.get(this.data[i].year) != null ){
        map.set(this.data[i].year, map.get(this.data[i].year)+1);
      }
      else {
        map.set(this.data[i].year, 1);
      }
    }

    for(let [key,value] of map) {
      if(map.get(key) > this.mostGS) {
        this.mostGS = map.get(key);
        this.mostGSYear = key;
      }
    }
  }

  sort(colName: string) {

    if(colName === 'result') {
      if(this.asc) {
        this.data.sort((a, b) => a.result > b.result ? 1 : a.result < b.result ? -1 : 0);
        this.asc = false;
      }
      else {
        this.data.sort((a, b) => a.result < b.result ? 1 : a.result > b.result ? -1 : 0);
        this.asc = true;
      }
    }
    if(colName === 'year') {
      if(this.asc) {
        this.data.sort((a, b) => a.year > b.year ? 1 : a.year < b.year ? -1 : 0);
        this.asc = false;
      }
      else {
        this.data.sort((a, b) => a.year < b.year ? 1 : a.year > b.year ? -1 : 0);
        this.asc = true;
      }
    }
    if(colName === 'tournament') {
      if(this.asc) {
        this.data.sort((a, b) => a.tournament > b.tournament ? 1 : a.tournament < b.tournament ? -1 : 0);
        this.asc = false;
      }
      else {
        this.data.sort((a, b) => a.tournament < b.tournament ? 1 : a.tournament > b.tournament ? -1 : 0);
        this.asc = true;
      }
    }
    if(colName === 'opponent') {
      if(this.asc) {
        this.data.sort((a, b) => a.opponent > b.opponent ? 1 : a.opponent < b.opponent ? -1 : 0);
        this.asc = false;
      }
      else {
        this.data.sort((a, b) => a.opponent < b.opponent ? 1 : a.opponent > b.opponent ? -1 : 0);
        this.asc = true;
      }
    }
    if(colName === 'score') {
      if(this.asc) {
        this.data.sort((a, b) => a.score > b.score ? 1 : a.score < b.score ? -1 : 0);
        this.asc = false;
      }
      else {
        this.data.sort((a, b) => a.score < b.score ? 1 : a.score > b.score ? -1 : 0);
        this.asc = true;
      }
    }
  }

  reset() {
    localStorage.clear();
    this.router.navigate(['/setup']);
  }

  openModal(id: string) {
    const modal = document.getElementById(id);
    if(modal != null) {
      modal.style.display = 'block';
    }
  }

  closeModal(id: string) {
    const modal = document.getElementById(id);
    if(modal != null) {
      modal.style.display = 'none';
    }
  }

  saveRow() {
    this.data.push(this.newRow);
    this.newRow = new DataRow();
    localStorage.setItem("data", JSON.stringify(this.data));

    this.calculateTotals();
    this.closeModal('newRowModal');
  }

  saveBio() {
    localStorage.setItem("bio", this.bio);
    this.closeModal('editBioModal');
  }

  filterValueChanged() {

    this.data = JSON.parse(localStorage.getItem("data") || "[]");

    let resultFilter = this.resultFilter;
    let yearFilter = this.yearFilter;
    let tournFilter = this.tournFilter;
    let opponFilter = this.opponFilter;
    let scoreFilter = this.scoreFilter;
    this.data = this.data.filter( function(data) {
      return data.result.toLowerCase().startsWith(resultFilter.toLowerCase())
        && data.year.toString().startsWith(yearFilter.toLowerCase())
        && data.tournament.toLowerCase().startsWith(tournFilter.toLowerCase())
        && data.opponent.toLowerCase().startsWith(opponFilter.toLowerCase())
        && data.score.toLowerCase().startsWith(scoreFilter.toLowerCase());
    });
  }
}

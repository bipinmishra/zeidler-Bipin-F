import { Component, OnInit } from '@angular/core';
import { CountryListService } from '../services/country-list.service';
import { RestService } from '../services/rest.service';
import { HttpResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.sass']
})
export class HolidayListComponent implements OnInit {
  countryListName;
  currentSelceted = "Select any options";
  currentCountry = null;
  currentYear = null;
  YearList = [2015, 2016, 2017, 2018, 2019];
  holidayData;
  errorMsg = false;
  errorMsg2 = false;
  dataLoading = false;
  constructor(private countryList: CountryListService, private _http: RestService) { }
  ngOnInit() {
    this.countryList.currentCountry.subscribe((data) => { this.countryListName = data });
  }
  filterFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  optionSelected(name, value) {
    if (value == 'US') {
      this.currentSelceted = name;
      this.currentCountry = value;
      this.errorMsg = false;
    }
    else if (value == 'GB') {
      this.currentSelceted = name;
      this.currentCountry = value;
      this.errorMsg = false;
    }
    else if (value == 'FR') {
      this.currentSelceted = name;
      this.currentCountry = value;
      this.errorMsg = false;
    }
    else if (value == 'DE') {
      this.currentSelceted = name;
      this.currentCountry = value;
      this.errorMsg = false;
    }
    else if (value == 'ID') {
      this.currentSelceted = name;
      this.currentCountry = value;
      this.errorMsg = false;
    }
    else {
      //  alert('Select allowed country');
      this.errorMsg = true;
    }
  }
  selectYear(year) {
    this.currentYear = year;
    this.errorMsg2 = false;
  }
  getHoliday() {
    if (this.currentCountry != null && this.currentYear != null) {
      this.dataLoading = true;
      this._http.getAll(this.currentCountry, this.currentYear).subscribe(
        (data) => {
          this.holidayData = data;
          // console.log(Object.keys(this.holidayData.holidays));
          // console.log(Object.values(this.holidayData.holidays));
          let finalData = Object.keys(this.holidayData.holidays);
          this.holidayData = finalData;
          this.getModifiedData();
          setTimeout(() => {
            this.dataLoading = false;
          }, 100);
        },
        (error) => {
          console.log(error.error);
        }
      )
    } else if (this.currentCountry == null && this.currentYear == null) {
      this.errorMsg = true;
      this.errorMsg2 = true;
    }
    else if (this.currentYear == null) {
      this.errorMsg2 = true;
    }
    else {
      this.errorMsg = true;
    }
  }
  getModifiedData() {
    var myArray = this.holidayData,
      groupKey = 0;
    let groups = myArray.reduce(function (r, o) {
      var m = o.split(('-'))[1];
      (r[m]) ? r[m].data.push(o) : r[m] = { group: String(groupKey++), data: [o] };
      return r;
    }, {});
    this.holidayData = Object.keys(groups).map(function (k) { return groups[k]; });
    function compare(a, b) {
      return a.group - b.group;
    }
    this.holidayData.sort(compare);
    console.log(this.holidayData);
  }
}

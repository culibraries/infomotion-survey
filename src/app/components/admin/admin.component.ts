import { Component } from '@angular/core';
import { env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { isNull } from 'util';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  private from: string = '';
  private to: string = '';
  private queryUrl: string;
  public downloadURL: string = '';
  public dateValue: any[];

  constructor(private http: HttpClient)  {
    this.downloadURL = env.apiUrl + '/infomotion/survey/?query={"projection":{"_id":0}}&format=csv';
  }

  onChange() {
    this.queryUrl = env.apiUrl + '/infomotion/survey';
    if (!this.dateValue || isNull(this.dateValue) || isNull(this.dateValue[0]) || isNull(this.dateValue[1])) {
      this.downloadURL = this.queryUrl + '?query={"projection":{"_id":0}}&format=csv';
      return false;
    }
    this.from = this.dateValue[0].toISOString().substring(0, 10);
    this.to = this.dateValue[1].toISOString().substring(0, 10);
    if (this.from === this.to) {
      this.queryUrl += '?query={"filter":{"created_date":"' + this.from + '"},"projection":{"_id":0}}&format=csv';
    } else {
      this.queryUrl += '?query={"filter":{"created_date":' +
                      '{"$gte":"' + this.from +
                      '","$lte":"' + this.to +
                      '"}},"projection":{"_id":0}}&format=csv';
    }
    this.downloadURL = this.queryUrl;
  }
}

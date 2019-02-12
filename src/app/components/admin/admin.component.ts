import { Component, OnInit } from '@angular/core';
import { env } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { isNull } from 'util';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private from: string = '';
  private to: string = '';
  private queryUrl: string;
  private newQuery: string;
  constructor(private http: HttpClient) {
   }

  ngOnInit() {
  }
  public onSubmit({ value }: { value: string }) {
    this.queryUrl = env.apiUrl + '/infomotion/survey';
    if (!value['date-range']) {
      this.queryUrl += '?format=json';
    } else {
      if (this.from === this.to)
    {
      this.queryUrl += '?query={"filter":{"created_date":{"$e":"' + this.to + '"}},"projection":{"_id":0}}&format=json';
    } else {
      this.from = value['date-range'][0].toISOString().substring(0, 10);
    this.to = value['date-range'][1].toISOString().substring(0, 10);
    this.queryUrl += '?query={"filter":{"created_date":{"$gte":"' + this.from + '","$lte":"' + this.to + '"}},"projection":{"_id":0}}&format=json';
    }
    }
    this.http.get(this.queryUrl).subscribe(
      data => {
        this.exportAsExcelFile(data['results'], 'InfoMotion_Report_');
            }
    );

  }
  private exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + new  Date().getTime() + EXCEL_EXTENSION);
  }
  

}

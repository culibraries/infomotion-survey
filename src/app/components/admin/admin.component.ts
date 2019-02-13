import { Component } from '@angular/core';
import { env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { isNull } from 'util';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';

const baseURL = env.apiUrl + '/infomotion/survey';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  private from: string = '';
  private to: string = '';
  private queryUrl: string;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService)  {
    this.authService.getUserInformation().subscribe(
      (data: any) => {
        if (data['groups'].indexOf('infomotion-admin') === -1) {
          this.router.navigate(['401']);
        }
      });
  }

  public onSubmit({ value }: { value: string }) {

    if (!value['date-range'] || isNull(value['date-range']) || isNull(value['date-range'][0]) || isNull(value['date-range'][1])) {
      this.queryUrl = baseURL + '?query={"projection":{"_id":0}}&format=json';
      this.getNumberOfRecords(this.queryUrl);
      return false;
    }
    this.from = value['date-range'][0].toISOString().substring(0, 10);
    this.to = value['date-range'][1].toISOString().substring(0, 10);

    if (this.from === this.to) {
      this.queryUrl = baseURL + '?query={"filter":{"created_date":"' + this.from + '"},"projection":{"_id":0}}&format=json';
    } else {
      this.queryUrl = baseURL + '?query={"filter":{"created_date":' +
                      '{"$gte":"' + this.from +
                      '","$lte":"' + this.to +
                      '"}},"projection":{"_id":0}}&format=json';
    }
    this.getNumberOfRecords(this.queryUrl);
  }

  private getNumberOfRecords(query: string) {
    return this.http.get(this.queryUrl).subscribe(
      data => {
          if (data['count'] === 0) { alert('There is no record found');
          } else {
            alert('There are ' + data['count'] + ' records found. Click OK to generate the report.');
            this.exportAsExcelFile(data['results'], 'InfoMotion_Report_');
          }
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

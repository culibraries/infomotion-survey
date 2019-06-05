import { Component } from '@angular/core';
import { isNull } from 'util';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/services/api.service';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';

const baseURL = '/data_store/data/infomotion/survey/';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  private from: string = '';
  private to: string = '';
  private queryUrl: string = '';
  value: Date[];

  constructor(private apiService: ApiService) {
    this.value = [];
  }

  public onSubmit() {
    if (
      this.isUndefined(this.value) ||
      this.isUndefined(this.value[0]) ||
      this.isUndefined(this.value[1])
    ) {
      this.queryUrl =
        baseURL + '?query={"projection":{"_id":0}}&page_size=0&format=json';
      this.getNumberOfRecords(this.queryUrl);
      return true;
    }

    this.from = this.value[0].toISOString().substring(0, 10);
    this.to = this.value[1].toISOString().substring(0, 10);

    if (this.from === this.to) {
      this.queryUrl =
        baseURL +
        '?query={"filter":{"created_date":"' +
        this.from +
        '"},"projection":{"_id":0}}&page_size=0&format=json';
    } else {
      this.queryUrl =
        baseURL +
        '?query={"filter":{"created_date":' +
        '{"$gte":"' +
        this.from +
        '","$lte":"' +
        this.to +
        '"}},"projection":{"_id":0}}&page_size=0&format=json';
    }
    return this.getNumberOfRecords(this.queryUrl);
  }

  private isUndefined(value: any): boolean {
    if (!value || isNull(value)) {
      return true;
    }
    return false;
  }

  private getNumberOfRecords(query: string) {
    this.apiService.get(this.queryUrl).subscribe(data => {
      if (data['count'] === 0) {
        alert('There is no record found');
      } else {
        if (
          confirm(
            'There are ' +
              data['count'] +
              ' records found. Click OK to generate the report.'
          )
        ) {
          this.exportAsExcelFile(data['results'], 'InfoMotion_Report_');
        } else {
          return false;
        }
      }
    });
  }

  private exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {
      header: ['response', 'comment', 'created_date', 'timestamp']
    });
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + new Date().getTime() + EXCEL_EXTENSION);
  }
}

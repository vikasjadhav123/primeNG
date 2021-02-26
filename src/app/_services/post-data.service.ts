import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  employee: any = [
    { id: 1, title: 'PrimeNG', discription: 'Desingning', date: '25/10/1996' },
    { id: 2, title: 'Angular', discription: 'Develoment', date: '01/10/2005' }
  ];

  constructor() { }

  getAllemployeePosts(): Observable<any> {
    return of(this.employee);
  }

  submitdata(isAdd: any, form: any): Observable<any> {
    if (isAdd) {
      console.log(form.value);
      this.Addfun(form);
    }
    else {
      let emp = this.employee.find((s: any) => s.id == form.value.id);
      emp.title = form.value.title;
      emp.discription = form.value.discription;
      emp.date = form.value.date;
    }
    form.reset();
    return of(null);

  }

  Addfun(form: any) {
    let leg: any = { id: '', title: '', discription: '', date: '' };
    leg.id = form.value.id;
    leg.title = form.value.title;
    leg.discription = form.value.discription;
    leg.date = form.value.date;

    this.employee.push(leg);

  }

  deleterecord(id: any): Observable<any> {
    let empIndex = this.employee.findIndex((s: any) => s.id == id);

    this.employee.splice(empIndex, 1);
    return of(null);

  }

  edit(id: any, form: any): Observable<any> {

    let empIndex = this.employee.find((s: any) => s.id == id);
    form.setValue(empIndex);
    return of(null);

  }
}

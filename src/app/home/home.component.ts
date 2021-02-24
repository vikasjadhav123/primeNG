import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[] = [];
    title = 'App';

    isAdd: boolean = true;

    employee: any = [];

    constructor(private userService: UserService, private fb: FormBuilder) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    form = this.fb.group({
        id: ['', Validators.required],
        title: [''],
        discription: [''],
        date: ['']


    });
    get f() { return this.form.controls; }


    Submit() {
        if (this.isAdd) {
            console.log(this.form.value);
            this.Addfun();
            console.log(this.employee);
        }
        else {
            let emp = this.employee.find((s: any) => s.id == this.form.value.id);
            emp.title = this.form.value.title;
            emp.discription = this.form.value.discription;
            emp.date = this.form.value.date;
            this.isAdd =true;
        }
        this.form.reset();
    }

    deleterecord(id: any) {
        let empIndex = this.employee.findIndex((s: any) => s.id == id);

        this.employee.splice(empIndex, 1);
        alert("YOU WANT TO DELETE RECORD.....");
    };


    edit(id: any) {
        this.isAdd = false;
        let empIndex = this.employee.find((s: any) => s.id == id);
        this.form.setValue(empIndex);
        // this.form.value.title = empIndex.title;
        // this.form.value.discription = empIndex.discription;
        // this.form.value.date = empIndex.date;


    }
    Addfun() {
        let leg: any = { id: '', title: '', discription: '', date: '' };
        leg.id = this.form.value.id;
        leg.title = this.form.value.title;
        leg.discription = this.form.value.discription;
        leg.date = this.form.value.date;

        this.employee.push(leg);
    }

}
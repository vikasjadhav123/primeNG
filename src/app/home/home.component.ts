import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostDataService } from '../_services/post-data.service';



@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[] = [];
    title = 'App';

    isAdd: boolean = true;
    employee: any =[];
    

    constructor(private userService: UserService, private postDataService: PostDataService, private fb: FormBuilder) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });

        this.postDataService.getAllemployeePosts().subscribe(posts =>{
            this.employee= posts;
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
        
        this.postDataService.submitdata(this.isAdd,this.form).subscribe(post =>{
           // alert('res'+post);
            if(!this.isAdd){
            this.isAdd = true;
            }
            
        });
       
    }

    deleterecord(id: any) {
        this.postDataService.deleterecord(id).subscribe((post:any) => {
            if(post == null)
            alert("RECORD DELETED.....");
        })
       
    };


    edit(id: any) {
        
        this.isAdd = false;
        this.postDataService.edit(id,this.form).subscribe((post: any) =>{
            
        })

    }
    
    

}
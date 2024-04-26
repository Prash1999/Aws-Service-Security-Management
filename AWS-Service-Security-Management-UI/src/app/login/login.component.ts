import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { S3BucketsService } from '../services/s3-buckets.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginForm: any = FormGroup;
  password: any;
  userName: string = "";

  constructor(private formBuilder: FormBuilder, private s3BucketService: S3BucketsService, private spinner: NgxSpinnerService,
    private router: Router, private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit(){
    console.log("in submit");
    
    this.spinner.show();
    this.userName = this.loginForm.get("userName").value;
    this.password = this.loginForm.get("password").value;
    console.log(this.userName, this.password);
    setTimeout(() => {
      this.s3BucketService.login(this.userName, this.password).subscribe({
        next: (res: any) => {
          console.log(res);
          
          if(res.status == 200){
            sessionStorage.setItem("token", res.body.token);
            this.toastr.success("Login Successful","Success",{ closeButton: true });
            this.router.navigate(['/home']);
          }else{
            this.toastr.warning("Username or Password is wrong","Login Failed", { closeButton: true });
            throw Error("Username or Password is wrong");
          }
        },
        error: (err) => {
          this.toastr.error("Something went wrong", "Error", { closeButton: true });
          console.log(err);
          
        }
      });
      this.spinner.hide();
    }, 2000)
    
  }

}

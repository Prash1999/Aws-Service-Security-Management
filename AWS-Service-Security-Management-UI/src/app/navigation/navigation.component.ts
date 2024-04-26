import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { S3BucketsService } from '../services/s3-buckets.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  tab="";
  

  constructor(private router: Router, private s3BucketService: S3BucketsService, private spinner: NgxSpinnerService, private toastr: ToastrService){}

  ngOnInit() {
    this.tab = this.s3BucketService.tab;
  }

  selectTab(selection: string){  
    this.s3BucketService.tab = selection;
    if(selection == "S3"){
      this.router.navigate(["/home"]);
    }else if(selection == "iam"){
      this.router.navigate(["/iam"]);
    }else{
      this.router.navigate(["/ssm"]);
    }
  }

  LogOut(){
    this.spinner.show();
    setTimeout(() => {
      sessionStorage.removeItem("token");
      this.spinner.hide();
      this.toastr.success("Logout Successful", "Success", { closeButton: true});
      this.router.navigate(["/login"]);
    }, 3000);
  }
}

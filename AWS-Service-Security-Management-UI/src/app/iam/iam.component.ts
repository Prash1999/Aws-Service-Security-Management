import { Component } from '@angular/core';
import { S3BucketsService } from '../services/s3-buckets.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-iam',
  templateUrl: './iam.component.html',
  styleUrls: ['./iam.component.css']
})
export class IamComponent {
  users: any = [];

  constructor(private s3BucketService: S3BucketsService, private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService) { }
  ngOnInit() {
    this.s3BucketService.tab = "iam";
    this.fetchUsers();
  }
  async fetchUsers() {
    this.spinner.show();
    try {
      this.s3BucketService.getIamUsersWithPermissions().subscribe({
        next: (response) => {
          console.log(response);
          if (response.status == 200) {
            this.users = response.body;
            this.toastr.success("Fetched All Users Successfully","Success",{ closeButton: true });
            this.spinner.hide();
          } else {
            this.toastr.error("Unable to Fetch Users", "Error", { closeButton: true });
            this.spinner.hide();
            throw Error("Something went wrong");
          }
        }
      })
    } catch (error) {
      this.toastr.error("Something went wrong", "Error", { closeButton: true });
      this.spinner.hide();
      console.log(error);
    }
  }

  onSubmit(userName: string, policies: Array<any>) {
    this.spinner.show();
    for (let index = 0; index < policies.length; index++) {
      this.s3BucketService.deleteUserAttachedPolicies(userName, policies[index].PolicyArn).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 201) {
            if (index == policies.length - 1) {
              this.toastr.success(`Deleted All Permissions for ${userName} Successfully`,"Success",{ closeButton: true });
              this.spinner.hide();
              this.ngOnInit();
            }
          } else {
            this.toastr.error("Unable Delete Permissions", "Error", { closeButton: true });
            this.spinner.hide();
            throw new Error("Something went wrong");
          }
        },
        error: (err) => {
          this.toastr.error("Something went wrong", "Error", { closeButton: true });
          this.spinner.hide();
          console.log(err);
        }
      });
    }

  }
}

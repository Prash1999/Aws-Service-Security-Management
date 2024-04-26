import { Component } from '@angular/core';
import { S3BucketsService } from '../services/s3-buckets.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-s3operation',
  templateUrl: './s3operation.component.html',
  styleUrls: ['./s3operation.component.css']
})
export class S3operationComponent {
  title = 'S3_Encryption';
  buckets: any;
  bucketsWithPublicBlockAccessInfo: any = [];

  constructor(private s3BucketService: S3BucketsService, private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService) { }
  ngOnInit() {
    this.bucketsWithPublicBlockAccessInfo = [];
    this.s3BucketService.tab = "S3";
    this.fetchBuckets();
  }
  async fetchBuckets() {
    this.spinner.show();
    try {
      let publicblockaccessInfo: any;
      this.s3BucketService.getBuckets().subscribe({
        next: async (res) => {
          this.buckets = res.body.Buckets;
          for (let index = 0; index < this.buckets.length; index++) {
            publicblockaccessInfo = await lastValueFrom(this.s3BucketService.getBucketPublicAccess(this.buckets[index].Name));
            this.bucketsWithPublicBlockAccessInfo.push({ Name: this.buckets[index].Name, status: publicblockaccessInfo.body.BlockPublicPolicy })
          }
          this.toastr.success("Fetched Buckets Successfully","Success",{ closeButton: true });
          this.spinner.hide();
        },
        error: (err) => {
          this.toastr.error("Unable to fetch buckets", "Error", { closeButton: true });
          this.spinner.hide();
          console.log(err);
        }
      })
    } catch (error) {
      this.toastr.error("Something went wrong", "Error", { closeButton: true });
      this.spinner.hide();
      console.log(error);
    }
  }

  onSubmit(bucketName: string) {
    this.spinner.show();
    this.s3BucketService.addBucketPublicBlockAccess(bucketName).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status == 200) {
          this.toastr.success("Blocked Public Access Successfully","Success",{ closeButton: true });
          this.spinner.hide();
          this.ngOnInit();
        }
      },
      error: (error) => {
        this.toastr.error("Something went wrong", "Error", { closeButton: true });
        this.spinner.hide();
        console.log(error);
      }
    })
  }
}

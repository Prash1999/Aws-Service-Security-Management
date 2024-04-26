import { Component } from '@angular/core';
import { S3BucketsService } from '../services/s3-buckets.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ssm',
  templateUrl: './ssm.component.html',
  styleUrls: ['./ssm.component.css']
})
export class SsmComponent {
  documents: any = [];

  constructor(private s3BucketService: S3BucketsService, private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService) { }
  ngOnInit() {
    this.s3BucketService.tab = "ssm";
    this.fetchDocuments();
  }
  async fetchDocuments() {
    this.spinner.show();
    try {
      this.s3BucketService.getDocuments().subscribe({
        next: (response) => {
          console.log(response);
          if (response.status == 200) {
            this.documents = response.body;
            this.toastr.success("Fetched All Documents Successfully","Success",{ closeButton: true });
            this.spinner.hide();
          } else {
            this.toastr.error("Unable to Fetch Documents", "Error", { closeButton: true });
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

  onSubmit(documentName: string, accountIds: Array<string>) {
    console.log(accountIds);
    
    this.spinner.show();
      this.s3BucketService.updateDocumentPermission(accountIds,documentName).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 200) {
              this.toastr.success(`Removed access of all accounts Successfully for document ${documentName} `,"Success",{ closeButton: true });
              this.spinner.hide();
              this.ngOnInit();
          } else {
            this.toastr.error("Unable Remove access of all accounts", "Error", { closeButton: true });
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

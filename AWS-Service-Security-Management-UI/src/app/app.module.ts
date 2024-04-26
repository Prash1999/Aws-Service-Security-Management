import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { S3BucketsService } from './services/s3-buckets.service';
import { LoginComponent } from './login/login.component';
import { S3operationComponent } from './s3operation/s3operation.component';
import { RequestinterceptorInterceptor } from './interceptor/requestinterceptor.interceptor';
import { NavigationComponent } from './navigation/navigation.component';
import { IamComponent } from './iam/iam.component';
import { SsmComponent } from './ssm/ssm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    S3operationComponent,
    NavigationComponent,
    IamComponent,
    SsmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      maxOpened: 0,
      autoDismiss: true
    }),
  
  ],
  providers: [S3BucketsService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestinterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

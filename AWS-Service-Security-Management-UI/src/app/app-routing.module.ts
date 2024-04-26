import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { S3operationComponent } from './s3operation/s3operation.component';
import { NavigationComponent } from './navigation/navigation.component';
import { IamComponent } from './iam/iam.component';
import { SsmComponent } from './ssm/ssm.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: S3operationComponent },
  { path: "login", component: LoginComponent },
  { path: "nav", component: NavigationComponent},
  { path: "iam", component: IamComponent},
  { path: "ssm", component: SsmComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class S3BucketsService {

  constructor(private http: HttpClient) { }
  public tab = "";
  private getBucketsEndPoint = "http://localhost:4000/s3buckets";
  private getPublicBlockAccessEndPoint = "http://localhost:4000/publicblockaccess";
  private addPublicBlockAccessEndPoint = "http://localhost:4000/addpublicblockaccess";
  private loginEndPoint = "http://localhost:4000/login";
  private getIamUsersEndPoint = "http://localhost:4000/users";
  private deleteUserPoliciesEndPoint = "http://localhost:4000/delete/policy";
  private getDocumentsEndPoint = "http://localhost:4000/documents";
  private updateDocumentPermissionEndPoint = "http://localhost:4000/document";
  
  getBuckets(): Observable<any>{
    return this.http.get(this.getBucketsEndPoint, { observe: "response" });
  }

  getBucketPublicAccess(bucketName: string){
    return this.http.get(this.getPublicBlockAccessEndPoint + "/" + bucketName, { observe: "response" });
  }

  addBucketPublicBlockAccess(bucketName: string){
    return this.http.post(this.addPublicBlockAccessEndPoint + "/" + bucketName, { observe: "response"});
  }

  login(userName: string, password: string){
    let data = {
      userName,
      password
    }
    return this.http.post(this.loginEndPoint, data, {observe: "response"});
  }

  getIamUsersWithPermissions(){
    return this.http.get(this.getIamUsersEndPoint,{ observe: "response"});
  }

  deleteUserAttachedPolicies(userName: string, policy: string){
    let data = {
      userName,
      policy
    }
    console.log(data);
    
    return this.http.post(this.deleteUserPoliciesEndPoint, data, { observe: "response"});
  }

  getDocuments(){
    return this.http.get(this.getDocumentsEndPoint, { observe: "response" });
  }

  updateDocumentPermission(accountIds: Array<string>, documentName: string){
    let data = {
      accountId : accountIds
    }

    return this.http.post(this.updateDocumentPermissionEndPoint + "/" + documentName, data, { observe: "response" });
  }
}

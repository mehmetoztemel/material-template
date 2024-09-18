import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class BaseRestService<T> {
    constructor(protected http: HttpClient, protected apiUrl: string) { }

    public getAll(): Observable<T> {   
      return this.http.get<T>(this.apiUrl);
    }
    public getById(id: string | number): Observable<T> {
      return this.http.get<T>(this.apiUrl + id);
    }
    public add(item:T): Observable<T> {
      return this.http.post<T>(this.apiUrl, item);
    }
    public update(id: any, itemToUpdate: any): Observable<T> {
      return this.http.put<T>(this.apiUrl + id, itemToUpdate);
    }
    public delete(item: string): Observable<T> {
      return this.http.delete<T>(this.apiUrl + item);
    }
}
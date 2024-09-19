import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class BaseRestService<T> {
  constructor(protected http: HttpClient, protected apiUrl: string) { }

  public Get(): Observable<T> {
    return this.http.get<T>(this.apiUrl);
  }
  public GetById(id: string | number): Observable<T> {
    return this.http.get<T>(this.apiUrl + id);
  }
  public Save(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item);
  }
  public Update(itemToUpdate: any): Observable<T> {
    return this.http.put<T>(this.apiUrl, itemToUpdate);
  }
  public Delete(item: string | number): Observable<T> {
    return this.http.delete<T>(this.apiUrl + item);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  url: string = environment.serverUrlAdmonPagos;
  private resultsSubject = new BehaviorSubject<any[]>([]);
  sharedVariable: any;
  results$ = this.resultsSubject.asObservable();

  constructor(public http: HttpClient) { 
  }

  defaultImgUrl = 'https://static.vecteezy.com/system/resources/previews/006/852/543/non_2x/people-working-and-conference-vector.jpg';

  get  = (endPoint: string): Observable<any> => this.http.get<any>(`${this.url}/${endPoint}`);
  post = (endPoint: string, item: any): Observable<any> => this.http.post<any>(`${this.url}/${endPoint}`, item);
  put  = (endPoint: string, id: number, item: any): Observable<any> => this.http.put<any>(`${this.url}/${endPoint}/${id}`, item); 
  del  = (endPoint: string, id: any): Observable<any> => this.http.delete<any>(`${this.url}/${endPoint}/${id}`);
  patch = (endPoint: string, id: number, patchDocument: any): Observable<any> => {
          const url = `${this.url}/${endPoint}/${id}`;
          return this.http.patch<any>(url, patchDocument);
        };

  getFile = (url: string): Observable<any> => this.http.get(url, { responseType: 'blob' }).pipe(map((res: any) => res));

  extractDataFromString = (url?: string): string[] => {
    if (!url || typeof url !== "string") return []; // Devolver un array vacío en lugar de null
    const data = url.split(";");
    if (data.length < 1 || data[0].length <= 0) return []; // Devolver un array vacío en lugar de null
    return data;
  };
  

  isExternalUrl = (url: string):boolean => {
    for (let i of ['http', 'www', 'https', '://']) {
      if (url.includes(i)) return true;
    }
    return false;
  }

  setSearchResults(results: any[]): void {
    this.resultsSubject.next(results);
  }

  getSearchResults(): Observable<any[]> {
    return this.results$;
  }

  getLocalStorageItem = (item: string) => localStorage.getItem(item);
  setLocalStorageItem(item: string, value: string) {
    localStorage.setItem(item, value);
  }

  removeLocalStorageItem(item: string) {
    localStorage.removeItem(item);
  }


  setSharedVariable(value: any) {
    this.sharedVariable = value;
  }

  getSharedVariable() {
    return this.sharedVariable;
  }


}

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe, Etudient, Prof } from 'src/app/interfaces/etudient';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }
// ======================== Students ==========================
  addStudent(stutent: Etudient): Observable<HttpResponse<Etudient>> {
    return this.http.post<Etudient>(`${environment.api}/stutent`, stutent, {
      observe: 'response',
    });
  }

  listStudent(): Observable<HttpResponse<Etudient[]>> {
    return this.http.get<Etudient[]>(`${environment.api}/stutent`, {
      observe: 'response',
    });
  }

  delete(stutent:Etudient){
    return this.http.delete(`${environment.api}/stutent/${stutent.id}`, {
      observe: 'response',
    });
  }
  updateStudent(id: number, updatedData: any): Observable<HttpResponse<Etudient>>{
     return this.http.put<Etudient>(`${environment.api}/stutent/${id}`, updatedData, {
          observe: 'response',
        });
  }
  
  

 

  // ========================= Profs ===================================

  addProf(prof: Prof): Observable<HttpResponse<Prof>> {
    return this.http.post<Prof>(`${environment.api}/prof`, prof, {
      observe: 'response',
    });
  }

  listProf(): Observable<HttpResponse<Prof[]>> {
    return this.http.get<Prof[]>(`${environment.api}/prof`, {
      observe: 'response',
    });
  }
  

  deleteP(prof:Prof){
    return this.http.delete(`${environment.api}/prof/${prof.id}`, {
      observe: 'response',
    });
  }

  updateP(id: number, updatedData: any): Observable<HttpResponse<Prof>>{
    return this.http.put<Prof>(`${environment.api}/prof/${id}`, updatedData, {
      observe: 'response',
    });
  }
  

  // ========================= Classe ===================================

  addClasse(classe: Classe): Observable<HttpResponse<Classe>> {
    return this.http.post<Classe>(`${environment.api}/classe`, classe, {
      observe: 'response',
    });
  }

  listClasse(): Observable<HttpResponse<Classe[]>> {
    return this.http.get<Classe[]>(`${environment.api}/classe`, {
      observe: 'response',
    });
  }
  

  deleteClasse(classe:Classe){
    return this.http.delete(`${environment.api}/classe/${classe.id}`, {
      observe: 'response',
    });
  }

  updateC(id: number, updatedData: any): Observable<HttpResponse<Classe>>{
    return this.http.put<Classe>(`${environment.api}/classe/${id}`, updatedData, {
      observe: 'response',
    });
  }
  
}


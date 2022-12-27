import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) {
  }

  sendAnswer(name: string, email: string, answer: string) {
    return this.http.post<any>('/api/contact-us', {name, email, answer});
  }
}

import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    });

    this.http.get('api/organizations/15', {headers}).subscribe({
      next: (res) => {
        console.log('Class: HomeComponent, Function: next, Line 16 res' , res);
      },
      error: (err) => {
        console.log('Class: HomeComponent, Function: error, Line 19 err' , err);
      },
    })
  }

}

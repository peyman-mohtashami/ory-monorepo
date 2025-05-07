import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CLIENT, HYDRA_URLS} from "../../../app.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    console.log(this.route.snapshot)
    console.log("code: " + code)
    if (code) {
      this.exchangeCodeForTokens(code);
    } else {
      console.error('Authorization code not found.');
    }
  }

  exchangeCodeForTokens(code: string) {
    const {clientId, redirectUri, clientSecret, grant_type} = CLIENT

    const tokenPayload = new URLSearchParams({
      code,
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type
    });

    const credentials = btoa(`${clientId}:${clientSecret}`);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`,
    });

    this.http.post(`${HYDRA_URLS.token}`, tokenPayload.toString(), {
      headers,
    }).subscribe({
      next: (response: any) => {
        console.log('Tokens:', response);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.authService.setLoggedIn(true)
        this.router.navigateByUrl('/home').then()
      },
      error: (err: any) => console.error('Token Error:', err)
    })
  }
}

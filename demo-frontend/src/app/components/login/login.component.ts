import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {


  }

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    console.log(this.route.snapshot)
    alert("code: " + code)
    if (code) {
      this.exchangeCodeForTokens(code);
    } else {
      console.error('Authorization code not found.');
    }
  }

  exchangeCodeForTokens(code: string) {
    const clientId = 'your-client-id';
    const clientSecret = 'your-client-secret';
    const redirectUri = 'http://localhost:4200/callback';

    const tokenRequest = {
      code: code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    };

    this.http.post('http://127.0.0.1:4444/oauth2/token', tokenRequest).subscribe((response: any) => {
      console.log('Tokens:', response);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      window.location.href = '/dashboard'; // Redirect to your app's main page
    });
  }
}

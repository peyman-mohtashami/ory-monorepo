import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from './auth/services/auth.service';

export const CLIENT = {
  clientId: 'daf',
  clientSecret: 'dafdafdaf',
  redirectUri: 'http://127.0.0.1:4200/login',
  scope: 'openid profile email offline',
  responseType: 'code',
  grant_type: 'authorization_code'
}

export const HYDRA_BASE_URL = 'http://127.0.0.1:4444'

export const HYDRA_URLS = {
  auth: `${HYDRA_BASE_URL}/oauth2/auth`,
  login: '/self-service/login/flows',
  consent: '/self-service/consent/flows',
  token: `${HYDRA_BASE_URL}/oauth2/token`,
  userinfo: '/userinfo',
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIcon, MatIconButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  loginWithHydra() {
    const {clientId, redirectUri, responseType, scope} = CLIENT;
    const state = "1102398157"

    window.location.href = `${HYDRA_URLS.auth}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&state=${state}&scope=${scope}`; // Redirect to Hydra's login page
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.authService.setLoggedIn(false)

    window.location.href = 'http://127.0.0.1:4444/oauth2/sessions/logout?return_to=http://127.0.0.1:4200/post-logout';
  }
}

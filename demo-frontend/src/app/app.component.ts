import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIcon, MatIconButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo-frontend';

  loginWithHydra() {
    const clientId = 'client_id_demo_app_frontend';
    const redirectUri = 'http://localhost:4200/login';
    const scope = 'openid profile email offline';
    const responseType = 'code';
    const state = "1102398157"

    const authUrl = `http://127.0.0.1:4444/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&state=${state}&scope=${scope}`;
    // http://127.0.0.1:4444/oauth2/auth?client_id=client_id_demo_app&redirect_uri=http://localhost:8080/login/oauth2/code/ory&response_type=code&state=1102398157&scope=offline%20openid%20profile%20email
    window.location.href = authUrl; // Redirect to Hydra's login page
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = 'http://127.0.0.1:4444/oauth2/logout?redirect_uri=http://localhost:4200';
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  flow: any;
  identifier: string = '';
  password: string = '';
  flowId: string = '';

  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    this.flowId = this.route.snapshot.queryParamMap.get('flow') || '';

    if (!this.flowId) {
      // Redirect user to start the login flow
      window.location.href = 'http://localhost:4433/self-service/login/browser';
      return;
    }

    this.auth.getLoginFlow(this.flowId).subscribe({
      next: (flow) => this.flow = flow,
      error: () => {
        // Restart login flow if flow expired or invalid
        window.location.href = 'http://localhost:4433/self-service/login/browser';
      }
    });
  }

  submit(): void {
    const payload = {
      method: 'password',
      password: this.password,
      identifier: this.identifier
    };

    this.auth.submitLogin(this.flowId, payload).subscribe({
      next: (res) => {
        console.log('Login successful', res);
        // Redirect after login (adjust to your app)
        window.location.href = '/dashboard';
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}

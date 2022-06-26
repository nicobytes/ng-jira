import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isOpen = false;
  user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}

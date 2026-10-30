import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BasketService } from '../../../basket/services/basket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login implements OnInit {

  ngOnInit(): void {
    this.loginForm.reset({
      email: '',
      password: ''
    });

    console.log('Login initialized');
    console.log('Form values:', this.loginForm.getRawValue());
  }


/*   clearForm(): void {
      this.loginForm.reset({
        email: '',
        password: ''
      });

      console.log(this.loginForm.getRawValue());
  } */
  

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly basketService=inject(BasketService);
  private readonly router = inject(Router);

  readonly Message = signal('');
  readonly isLoading = signal(false);
  readonly itemsCount=this.basketService.loadBasket().length;

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onLogin(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.Message.set('');
    this.isLoading.set(true);

    this.authService.try_login(
        this.loginForm.getRawValue()
    ).subscribe({
        next: () => {
          this.isLoading.set(false);
          if (this.itemsCount > 0)
          {
              this.router.navigate(['basket']);
          }else{
              this.router.navigate(['/']);
          }
          
        },
        error: () => {
          this.isLoading.set(false);
          this.Message.set('Email ou mot de passe incorrect, ou compte non confirmé.');
        }
    });
  }
}
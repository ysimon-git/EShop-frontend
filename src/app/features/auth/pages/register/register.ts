import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { readonly } from "@angular/forms/signals";




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html'
})
export class Register implements OnInit {

    ngOnInit(): void {
        this.registerForm.reset({
        email: '',
        password: '',
        name:'',
        firstname:''
        });
    }

    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    readonly Message = signal('');
    readonly isLoading = signal(false);
    readonly isRegistered=signal<boolean>(false);
   

    readonly registerForm = this.fb.nonNullable.group({
        firstname:['',[Validators.required,Validators.minLength(3)]],
        name:['',[Validators.required,Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).*$/)]]
        });


    onRegister(): void {

        if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
        return;
        }

        this.Message.set('');
        this.isLoading.set(true);

        this.authService.register(
            this.registerForm.getRawValue()
        ).subscribe({
            next: () => {
            this.isLoading.set(false);
            //this.router.navigate(['login']);
             this.isRegistered.set(true);
             this.Message.set('Vous êtes bien enregistré(e), vous pouvez maintenant vous connecter.');
            },
            error: () => {
            this.isLoading.set(false);
            this.Message.set('Email déjà existant.');
            }
        });
  }

}
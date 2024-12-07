import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _Router=inject(Router)

  msgError: string = '';
  isLoading: boolean = false;
  msgSuccess:boolean=false;


//   registerForm: FormGroup=this._FormBuilder.group({
//   name:[null , [
//           Validators.required,
//           Validators.minLength(3),
//           Validators.maxLength(15),
//         ]],
//   email:[null , [Validators.required, Validators.email]],
//   password:[null , [
//           Validators.required,
//           Validators.pattern(/^\w{6,}$/),
//         ]],
//   rePassword:[null],
//   phone:[null, , [
//           Validators.required,
//           Validators.pattern(/^01[0125][0-9]{8}$/),
//         ]],

// }, {Validators:this.confirmPassword})





  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),
      rePassword: new FormControl(null),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confirmPassword
  );

  confirmPassword(g: any) {
    if (g.get('password').value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { misMatch: true };
    }
  }

  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          // navigate to login page
          this.msgSuccess=true;
if(res.message=='success'){
setTimeout(()=>{
  this._Router.navigate(['/login'])
},2000)

}
          this.isLoading = false;

        },
        error: (err) => {
          this.msgError = err.error.message;
          console.log(err);
          this.isLoading = false;
        },
      });
    }
    else{
      this.registerForm.markAllAsTouched()
    }
  }
}

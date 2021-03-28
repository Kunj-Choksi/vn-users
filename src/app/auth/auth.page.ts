import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    authForm: FormGroup;
    public formIsSubmitted = false;

    constructor(private authService: AuthService,
        private navCtrl: NavController) { }

    ngOnInit() {
        this.authForm = new FormGroup({
            email: new FormControl("", {
                updateOn: "change",
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl("admin@123", {
                updateOn: "change",
                validators: [Validators.required]
            })
        })
    }
    getLogin() {
        this.formIsSubmitted = true;
        console.log(this.authForm);
        if (this.authForm.valid) {
            let email = this.authForm.value.email;
            this.authService.set(email);
            this.navCtrl.navigateForward("/landing");
        }
    }
}

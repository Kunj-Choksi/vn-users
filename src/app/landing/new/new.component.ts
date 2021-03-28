import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LandingServices } from '../landing.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
    userForm: FormGroup
    constructor(private landingServ: LandingServices, private modalCtrl: ModalController) { }

    ngOnInit() {
        this.userForm = new FormGroup({
            firstName: new FormControl(null, {
                updateOn: "change",
                validators: [Validators.required]
            }),
            lastName: new FormControl(null, {
                updateOn: "change",
                validators: [Validators.required]
            }),
            email: new FormControl(null, {
                updateOn: "change",
                validators: [Validators.required, Validators.email]
            }),
        })
    }

    addNew() {
        if (this.userForm.valid) {
            this.landingServ.addNewUser(this.userForm.value.firstName, this.userForm.value.lastName, this.userForm.value.email).subscribe((resData) => {
                this.modalCtrl.dismiss(resData);
            })
        }
    }
}

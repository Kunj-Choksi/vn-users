import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, LoadingController, ModalController } from '@ionic/angular';

import { AuthService } from '../auth/auth.service';
import { User } from '../shared/user.model';
import { LandingServices } from './landing.service';
import { NewComponent } from './new/new.component';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
    userName: string;
    users: User[];
    fetchingData = false;
    constructor(private authService: AuthService,
        private routerOutlet: IonRouterOutlet,
        private landingServ: LandingServices,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController) { }

    ngOnInit() {
        this.routerOutlet.swipeGesture = false;
        this.userName = this.authService.getUserName();
        this.fetchingData = true;
        this.landingServ.users.subscribe(users => {
            console.log(users);
            this.users = users;
            this.fetchingData = false;
        })
    }

    addNewUser() {
        this.modalCtrl.create({
            component: NewComponent,
        }).then(newCompo => {
            newCompo.present();
            newCompo.onDidDismiss().then(resData => {
                this.users.push(resData.data);
            })
        })
    }

    deleteUser(user: User) {
        this.loadingCtrl.create({
            message: `Deleting ${user.first_name}...`
        }).then(loadingEl => {
            loadingEl.present();
            this.landingServ.deleteUser(user.id).subscribe(() => {
                this.users = this.users.filter(item => {
                    return item.id !== user.id;
                })
                this.loadingCtrl.dismiss();
            })
        })

    }
}

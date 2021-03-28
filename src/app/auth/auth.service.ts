import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userInfo = { email: "" };

    set(email: string) {
        this.userInfo = {
            email: email
        }
    }

    getUserName() {
        const email = this.userInfo.email;
        let userName = "";
        if (email.includes("@")) {
            userName = email.split("@")[0];
        }
        return userName;
    }
}

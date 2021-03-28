import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { take, tap, map } from "rxjs/operators";

import { User } from "../shared/user.model";

@Injectable({
    providedIn: "root"
})
export class LandingServices {
    private _users: Observable<User[]>;

    constructor(private httpCLient: HttpClient) {
        this._users = this.httpCLient.get<any>("https://reqres.in/api/users?page=2", {}).pipe(
            map(usersInfo => {
                return usersInfo.data;
            })
        )
    }

    get users() {
        return this._users;
    }

    addNewUser(firstName: string, lastName: string, email: string) {
        let avatarId = this.getRandomInt(1, 10);
        let newUser = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            avatar: `https://reqres.in/img/faces/${avatarId}-image.jpg`
        }
        return this.httpCLient.post<User>("https://reqres.in/api/users", newUser)
    }

    deleteUser(id) {
        return this.httpCLient.delete(`https://reqres.in/api/users/${id}`);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

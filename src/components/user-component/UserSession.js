import { Subject } from 'rxjs'
import db from '../../database/Fire'

class UserSession {
    constructor() {
        this.LoginHandler = new Subject()
        this.LogoutHandler = new Subject();
        this.firebasehandlerLogin();
    }


    firebasehandlerLogin() {
        let self = this;
        db.fire.auth().onAuthStateChanged((user) => {
            if (user) {
                //Login
                self.LoginHandler.next(user);
            } else {
                //Logout
                self.LogoutHandler.next(user);
            }
        });
    }


}

const UserSessionInstance = new UserSession();
Object.freeze(UserSessionInstance);
export default UserSessionInstance;
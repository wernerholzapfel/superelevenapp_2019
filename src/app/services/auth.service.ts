import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class AuthService {
    public user$: Observable<firebase.User>;
    public isAdmin = false;
    public displayName: string;
    public user: firebase.User;


    constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
        this.user$ = angularFireAuth.authState;

        this.user$.subscribe(user => {
            if (user) {
                // todo place to fetch participant data;
                this.angularFireAuth.auth.currentUser.getIdTokenResult(true).then(tokenResult => {
                    // this.store.dis§patch(new FetchParticipant());
                    this.user = user;
                    this.displayName = user.displayName;
                    this.isAdmin = tokenResult.claims.admin;
                });
            } else {
                console.log('er is geen user meer');
                this.user = null;
                this.displayName = null;
                this.isAdmin = false;
            }
        });
    }

    signInRegular(email, password) {
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    updateProfile(displayName: string) {
        this.getToken().then(response => {
            response.updateProfile({displayName});
        });
    }

    signUpRegular(email, password, displayName) {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    isLoggedIn() {
        return this.angularFireAuth.authState;
    }

    logout() {
        return new Promise((resolve, reject) => {
            if (this.angularFireAuth.auth.currentUser) {
                this.angularFireAuth.auth.signOut()
                    .then(() => {
                        this.router.navigate(['/']);
                        resolve();
                    }).catch((error) => {
                    reject();
                });
            }
        });
    }

    getToken(): Promise<any> {
        if (this.angularFireAuth.auth.currentUser) {
            return this.angularFireAuth.auth.currentUser.getIdToken(true);
        } else {
            return Promise.resolve(false);
        }
    }

    getTokenResult(): Promise<any> {
        if (this.angularFireAuth.auth.currentUser) {
            return this.angularFireAuth.auth.currentUser.getIdTokenResult(true);
        } else {
            return Promise.resolve(false);
        }
    }

    sendPasswordResetEmail(email: string): Promise<any> {
        return this.angularFireAuth.auth.sendPasswordResetEmail(email);
    }


}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {ParticipantService} from '../../services/participant.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    user = {
        email: '',
        password: '',
        displayName: '',
        teamName: '',
    };
    activeSegment = 'inschrijven';

    unsubscribe = new Subject<void>();

    constructor(public authService: AuthService,
                public toastController: ToastController,
                private participantService: ParticipantService,
                private router: Router) {
    }

    userForm = new FormGroup({
        emailFormControl: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        displayName: new FormControl('', [
            Validators.required,
        ]),
        teamName: new FormControl('', [
            Validators.required,
            Validators.maxLength(25)
        ]),
        passwordFormControl: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
        ])
    });

    wachtwoordvergeten = false;

    ngOnInit() {
    }

    signInWithEmail() {
        this.authService.signInRegular(this.user.email, this.user.password)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((res) => {
                console.log(res);
                this.user.email = '';
                this.user.password = '';
                // this.store.dispatch(new fromParticipantForm.ClearParticipantform());
                this.router.navigate(['/prediction']);
            }, async err => {
            const toast = await this.toastController.create({
                message: err.message,
                duration: 2000
            });
            toast.present();
            console.log('error: ' + err);
        });
    }

    sendPasswordResetEmail() {
        this.authService.sendPasswordResetEmail(this.user.email)
            .then(async (res) => {
                const toast = await this.toastController.create({
                    message: 'Verzoek om wachtwoord te wijzigen is ontvangen.',
                    duration: 2000
                });
                toast.present();
            })
            .catch(async (err) => {
                const toast = await this.toastController.create({
                    message: err.message,
                    duration: 2000
                });
                toast.present();
                console.log('error: ' + err);
            });
    }

    signUpRegular() {
        this.authService.signUpRegular(this.user.email, this.user.password, this.user.displayName)
            .then((res) => {
                    if (res) {
                        delete this.user.password;
                        // this.authService.updateProfile(this.user.displayName);
                        this.participantService.postParticipant({
                            displayName: this.user.displayName,
                            teamName: this.user.teamName,
                            email: this.user.email
                        })
                            .subscribe(response => {
                                this.user.teamName = '';
                                this.user.displayName = '';
                                this.user.email = '';
                                this.user.password = '';
                                console.log('user opgeslagen in database');
                            }, error1 => {
                                console.log(error1);
                            });
                        // this.store.dispatch(new fromParticipantForm.ClearParticipantform());
                    }
                }
            )
            .catch(async (err) => {
                const toast = await this.toastController.create({
                    message: err.message,
                    duration: 2000
                });
                toast.present();
                console.log('error: ' + err);
            });
    }

    logout() {
        this.authService.logout();
        // this.store.dispatch(new fromParticipantForm.ClearParticipantform());
    }

    activateResetPassword(isTrue: boolean) {
        this.wachtwoordvergeten = isTrue;
    }

    segmentChanged($event) {
        this.activeSegment = $event.detail.value;
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}


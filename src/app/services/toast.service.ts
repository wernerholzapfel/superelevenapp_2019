import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {Observable, of} from 'rxjs';
import {resolve} from 'q';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastController: ToastController, private alertController: AlertController) {
    }

    async presentToast(message: string,
                       color: string,
                       showCloseButton: boolean = true,
                       closeButtonText: string = 'OK',
                       duration: number = 2000) {
        const toast = await this.toastController.create({
            color,
            message,
            duration,
            showCloseButton,
            closeButtonText
        });
        toast.present();
    }

    async presentAlertConfirm(): Promise<boolean> {
        const alert = await this.alertController.create({
            header: 'Wijzigingen niet opgeslagen',
            message: 'Weet je zeker dat je de pagina wilt verlaten?',
            buttons: [
                {
                    text: 'Ja',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                    }
                }, {
                    text: 'Nee',
                    handler: () => {
                    }
                }
            ]
        });

        await alert.present();
        return await alert.onDidDismiss().then(result => result.role === 'cancel');
    }
}

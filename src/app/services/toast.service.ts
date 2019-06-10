import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastController: ToastController, private alertController: AlertController) {
    }

    async presentToast(message: string, duration?: number) {
        duration = duration ? duration : 2000;
        const toast = await this.toastController.create({
            color: 'warning',
            message,
            duration,
            showCloseButton: true,
            closeButtonText: 'X'
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
                    cssClass: 'secondary',
                    handler: () => {
                        alert.dismiss(true);
                    }
                }, {
                    text: 'Nee',
                    handler: () => {
                        alert.dismiss(false);
                    }
                }
            ]
        });

        await alert.present();
        return await alert.onDidDismiss().then((alertResponse) => {
            return alertResponse.data;
        });

    }
}

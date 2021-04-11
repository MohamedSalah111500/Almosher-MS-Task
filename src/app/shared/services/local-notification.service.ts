import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LocalNotificationService {
  constructor(private toastr: ToastController) {}

  async showSuccess(message, title) {
    const toast = await this.toastr.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }

  async showError(message, title) {
    const toast = await this.toastr.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }
}

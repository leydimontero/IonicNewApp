import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {

  cities: any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getCities().subscribe(res => {
      console.log("RES" , res);
      this.cities = res;
    })
  }

  getCities(){
    return this.http.get("assets/files/cities.json")
    .pipe(
      map((res: any) => {
        return res.data;
      })
    )
  }

  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'Ciudad Seleccionada',
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    toast.present()
  }

  async presentAlert1(){
    const alert = await this.alertController.create({
      header: 'Borrar Ciudad',
      message: '¿Estas Seguro que deseas eliminar la ciudad?',
      buttons: ['OK'],
    });
    await alert.present()
    let result = await alert.onDidDismiss();
    console.log(result);

  }

  async presentAlert2(){
    const alert = await this.alertController.create({
      header: 'Borrar Ciudad',
      message: '¿Estas Seguro que deseas eliminar la ciudad?',
      buttons: [{
        text: 'No',
        handler: () => {
          console.log('No cancel');
        }
      },
      {
        text: 'Si',
        handler: () => {
          console.log('Ciudad Eliminada');
        }
      },
    ],

    });
    await alert.present()
    let result = await alert.onDidDismiss();
    console.log(result);

  }

}

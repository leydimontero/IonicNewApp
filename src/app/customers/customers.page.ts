import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  users: any = [];
  searchedUser: any;
  permission: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.permission = true
    this.getUser().subscribe(res => {
      console.log("RES" , res);
      this.users = res;
      this.searchedUser = this.users
    })
  }

  goToHome() {
    this.router.navigate(['/home'])
  }

  getUser(){
    return this.http.get("assets/files/customers.json")
    .pipe(
      map((res: any) => {
        return res.data;
      })
    )
  }

  searchCustomer(event: any) {
    const text = event.target.value;

    // Asegúrate de que text es una cadena
    if (typeof text !== 'string') {
      return;
    }

    this.searchedUser = this.users;

    if (text && text.trim() !== '') {
      this.searchedUser = this.searchedUser.filter((user: any) => {
        // Asegúrate de que user.name no es undefined y es una cadena
        if (user.nombre && typeof user.nombre === 'string') {
          return user.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1;
        }
        return false;
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products : any[] = []

  constructor(private _prodserv : ProductsService,private router : Router) { }

  ngOnInit(): void {

   this._prodserv.getAllProducts(8,1)
      .subscribe((prods : {count : Number , products : any[]}) => 
        {
          this.products = prods.products;
       // console.log(prods.products)
      });
    
  }

  onProdClick(id:Number)
  {
      console.log(id)
      this.router.navigate(['product',id]).then
  }

}

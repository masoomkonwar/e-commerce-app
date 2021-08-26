import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import {productServerRes} from '../../models/Apartment'
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  id = this._route.snapshot.paramMap.get('id')
  product : any ;
  constructor(private _router : Router , private prodServ : ProductsService,private _route : ActivatedRoute) { } 
  ngOnInit(): void {
    this.prodServ.getOneProduct(this.id).subscribe(prod =>{
      this.product = prod;
      console.log(this.product);
      
    });
    
  }


}

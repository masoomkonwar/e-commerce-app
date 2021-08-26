import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private SERVER_URL = "http://localhost:3300/api/"
  private SINGLE_PRODUCT_URL = "http://localhost:3300/api/products/"
  constructor(private _http : HttpClient) { }

  getAllProducts(numberofresults=10,pageNum=1)
  {
     return this._http.get<any>(this.SERVER_URL+'products',{
      params : {
        limit : numberofresults.toString(),
        page : pageNum.toString()
      }
    })
  }
  getOneProduct(id)
  {
    return this._http.get<any>(this.SINGLE_PRODUCT_URL+id)
  }

}

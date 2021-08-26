import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProductsService} from '../products.service'

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {

  public pageNum ;
  products : any[] = []

  constructor(private _router : Router,private route : ActivatedRoute,private _prodserv : ProductsService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params : ParamMap)=>{
      let page = parseInt(params.get('page'));
      this.pageNum = page;
      this._prodserv.getAllProducts(6,this.pageNum)
      .subscribe((prods : {count : Number , products : any[]}) => 
        {
          this.products = prods.products;
       // console.log(prods.products)
      });
    });

  }

  goPrev(){
    let prevPage = this.pageNum - 1 
    if(prevPage<=0)
    {
      prevPage=1
    }
    this._router.navigate(['/colleges',prevPage])

  }
  goNext(){ 
    let nextPage = this.pageNum + 1 
    console.log(nextPage);
    
    this._router.navigate(['/colleges',nextPage])

  }
  onProdClick(id:Number)
  {
      console.log(id)
      this._router.navigate(['product',id]).then
  }
}

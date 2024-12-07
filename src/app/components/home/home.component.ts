import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

private readonly  _ProductsService=inject(ProductsService);
private readonly  _CategoriesService=inject(CategoriesService);

productList:IProducts[]=[];
categoriesList:ICategories[]=[]
getAllProductSub!:Subscription

ngOnInit(): void {

  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
console.log(res);
this.categoriesList=res.data;
    },
    error:(err)=>{
console.log(err);

    }
  })



  this.getAllProductSub=this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
console.log(res.data);
this.productList=res.data;
    },
    error:(err)=>{
console.log(err);

    }
  })
}
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.getAllProductSub?.unsubscribe()
}
}

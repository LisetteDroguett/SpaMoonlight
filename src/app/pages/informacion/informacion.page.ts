import { Component, OnInit } from '@angular/core';
import { ApiclientService } from 'src/app/services/apiclient.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  products: any = [];
  selectedProduct: any;

  /*compareWith:any;*/

  constructor(private api: ApiclientService) { }

  ionViewWillEnter(){
    this.getProductos();
  }

  ngOnInit() {
  }

  getProductos(){
    this.api.getProductos().subscribe((data)=>{
      if(Array.isArray(data)) {
        this.products = data.reverse();
      } else {
        console.error('Expected an array of products, but got:', data);
      }
      /*this.products=data;*/
      /*this.products.reverse();*/
    }, (error) => {
      console.error('Error fetching products:', error);
    });
  }
/*
  guardarProducto(){
    if(this.products.id==null){    
      this.api.createProducto(this.products).subscribe(
        ()=>{
          console.log("Creado Correctamente");
          this.getProductos();
        },
        error=>{
          console.log("Error " + error)
        }
      );
    }
    else{
      this.api.updateProducto(this.products.id,this.products).subscribe(
        ()=>{
          console.log("Actualizado Correctamente");
          this.getProductos();
        },
        error=>{
          console.log("Error " + error)
        }
      );
    }
  }

  eliminarProducto(id:any){
    console.log("eliminar")
    this.api.deleteProducto(this.products.id).subscribe(
      success=>{
        console.log("Eliminado correctamente");
        this.getProductos();
      },
      error=>{
        console.log("Error " + error)
      }
    )
  }
*/
}

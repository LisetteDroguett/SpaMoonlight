import { Component, OnInit } from '@angular/core';
import { ApiclientService } from 'src/app/services/apiclient.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  products:any={
    id:null,
    brand:"",
    names:"",
    product_type:""
  };

  compareWith:any;

  constructor(private api: ApiclientService) { }

  ionViewWillEnter(){
    this.getProductos();
  }

  ngOnInit() {
  }

  getProductos(){
    this.api.getProductos().subscribe((data)=>{
      this.products=data;
      this.products.reverse();
    });
  }

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
    this.api.deletePost(this.products.id).subscribe(
      success=>{
        console.log("Eliminado correctamente");
        this.getProductos();
      },
      error=>{
        console.log("Error " + error)
      }
    )
  }

}

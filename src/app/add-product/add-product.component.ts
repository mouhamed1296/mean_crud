import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Models/Product';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  //Creation du formGroup pour la validation et la récupération des données
  formGroup = new FormGroup({
    libelle: new FormControl('', [Validators.required]),
    prix: new FormControl('', [Validators.required]),
    categorie: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.regexp)]),
  })

  //produit initialisation
  product: Product = {
    libelle: '',
    prix: '',
    categorie: '',
    email: ''
  }

  //select options
  options: {value: string, description: string}[] = [
    {value: 'fruit', description: 'Fruits'},
    {value: 'electronique', description: 'Electronique'},
    {value: 'boisson', description: 'Boisson'},
  ]

  //recupération de la valeur du select(categorie)
  changeCategorie(e: any) {
    this.formGroup.controls.categorie?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  /* Constructeur */
  constructor(private productService: ProductService) {
    this.formGroup.valueChanges.subscribe((val) => {
     //console.log(this.formGroup.valid);

      this.product.libelle = String(val.libelle)
      this.product.prix = String(val.prix)
      this.product.categorie = String(val.categorie)
      this.product.email = String(val.email)
    })
  }

  // soumettre le formulaire au backend à travers le service
  submitForm() {
    console.log(this.product);

    this.productService.addProduit(this.product).subscribe(res => console.log(res));
  }
}

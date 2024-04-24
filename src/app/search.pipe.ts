import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './shared/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[], searchterm:string): Product[] {
    return products.filter( product => product.title.toLowerCase().includes(searchterm.toLowerCase()) );
  }

}

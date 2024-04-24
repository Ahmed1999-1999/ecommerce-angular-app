import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tremtext'
})
export class TremtextPipe implements PipeTransform {

  transform(productName:string, limit:number): string {
    return productName.split(' ').slice(0,limit).join(' ');
  }

}

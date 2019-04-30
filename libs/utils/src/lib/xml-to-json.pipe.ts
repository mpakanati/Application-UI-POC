import { Pipe, PipeTransform } from '@angular/core';
// import * as xml2js from 'xml2js';

@Pipe({
  name: 'xmlToJson'
})
export class XmlToJsonPipe implements PipeTransform {

  transform(data: any, args?: any): any {
    const res = {};
    // setting the explicitArray option prevents an array structure
   /*  xml2js.parseString(data, { explicitArray: false, trim: true }, (error, result) => {

      if (error) {
        throw new Error(error);
      } else {
        res = result;
      }
    }); */
    return res;
  }

}

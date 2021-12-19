import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import * as moment from 'moment';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  public transform(value, keys: string, term: string) {

    if (!term) return value;
    return (value || []).filter((item) => 
    
    keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key]))
    
    );

  }
}

@Pipe({
  name: 'completeSearch'
})
export class CompleteSearchPipe implements PipeTransform {

  public transform(value:any, term: string):any {

    if (!term) return value;
    return (value || []).filter((item) => {
      
      for(var key in item){
        let match = item.hasOwnProperty(key) && typeof item[key] !== 'object' && typeof item[key] !== 'boolean' && item[key].toLowerCase().indexOf(term) != -1;
        
        if(item.hasOwnProperty(key) && typeof item[key] !== 'object' && typeof item[key] !== 'boolean' && item[key].toLowerCase().indexOf(term.toLowerCase()) != -1){
          return item;
        }
      }
    });

}
}


@Pipe({
  name: 'datediff'
})
export class DatediffPipe implements PipeTransform {

  transform(date1: any, date2: any): any {

    const daydiff = moment(date1).diff(moment(date2), "days");
    // return Math.abs(daydiff);
    return daydiff;
  
  }
}

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if(args.length==0)
    return value;

    return value.filter(item =>{
      var matchesAll = true;
      
      // for(var i = 0; i<args.length; i++){
          
        if(item.hasOwnProperty(Object.keys(args[0]).toString()) && (item[Object.keys(args[0]).toString()]).toString().toLowerCase().indexOf(Object.values(args[0]).toString().toLowerCase()) != -1){
          return item;

        }else{ // at least one column did not match,
          matchesAll = false;
        }
      // }
      return matchesAll;
    });
  }
}

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }
    transform(value: string) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }
    transform(value: string) {
        return this.sanitized.bypassSecurityTrustResourceUrl(value);
    }
}
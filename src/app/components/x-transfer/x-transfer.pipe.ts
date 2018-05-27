import {Pipe, PipeTransform} from '@angular/core';
import {isArray} from 'util';

@Pipe({
    name: 'xTransSData'
})
export class XTransSDataPipe implements PipeTransform {

    transform(items: any[], mapKey: string, exKeys: string[]): any[] {
        if (!items || !isArray(items) || !mapKey || !exKeys) {
            return [];
        }
        return items.filter(i => exKeys.indexOf(i[mapKey]) < 0);
    }

}

@Pipe({
    name: 'xTransItemSearch'
})
export class XTransItemSearchPipe implements PipeTransform {

    transform(items: any[], searchText: string, mapKey: string, disabled?: boolean): any[] {
        if (!items || !isArray(items) || !searchText || disabled) {
            return items;
        }
        return items.filter(i => new RegExp(searchText).test(i[mapKey]));
    }

}

import {Injectable} from '@angular/core';
import {XBreadCrumbItem} from './x-bread-crumb-item';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class XBreadCrumbService {
    private items: XBreadCrumbItem[];
    private subject: Subject<XBreadCrumbItem[]>;

    constructor() {
        this.subject = new Subject<XBreadCrumbItem[]>();
    }

    private next() {
        setTimeout(() => {
            this.subject.next(this.items);
        });
    }

    public getItems(): XBreadCrumbItem[] {
        return this.items;
    }

    public setItems(items: XBreadCrumbItem[]) {
        this.items = items;
        this.next();
    }

    public pushItem(item: XBreadCrumbItem) {
        this.items.push(item);
        this.next();
        return this.items;
    }

    public popItem(): XBreadCrumbItem[] {
        this.items.pop();
        this.next();
        return this.items;
    }

    public splice(index: number, n: number): XBreadCrumbItem[] {
        this.items.splice(index, n);
        this.next();
        return this.items;
    }

    public replaceLast(item: XBreadCrumbItem): XBreadCrumbItem[] {
        this.items[this.items.length - 1] = item;
        this.next();
        return this.items;

    }

    public itemsChange() {
        return this.subject.asObservable();
    }

}

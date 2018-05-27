import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {XTransSDataPipe} from './x-transfer.pipe';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

export interface XTransferItemMap {
    _xKey: string;
    _xValue: string;
    _xChecked: string;
}

@Component({
    selector: 'app-x-transfer',
    templateUrl: './x-transfer.component.html',
    styleUrls: ['./x-transfer.component.scss'],
    providers: [XTransSDataPipe]
})
export class XTransferComponent implements OnInit {
    @Input('sData') public sData: any[] = [];
    @Input('dData') public dData: any[] = [];
    @Input('map') public map: XTransferItemMap;
    @Input('sSearchPipeDisabled') public sSearchPipeDisabled: boolean;
    @Input('dSearchPipeDisabled') public dSearchPipeDisabled: boolean;
    @Input('isDataGetting') public isDataGetting: boolean;
    @Output() public dDataChanged: EventEmitter<any[]> = new EventEmitter();
    @Output() public sSearchChange: EventEmitter<string> = new EventEmitter();
    @Output() public dSearchChange: EventEmitter<string> = new EventEmitter();
    @Output() public sListOnScroll: EventEmitter<any> = new EventEmitter();
    @Output() public dListOnScroll: EventEmitter<any> = new EventEmitter();
    public sCheckedData: any[];
    public dCheckedData: any[];
    public dDataKeys: string[];
    public sIndeterminate: boolean;
    public dIndeterminate: boolean;
    public sSearchValue: FormControl;
    public dSearchValue: FormControl;

    constructor(private xTransSDataPipe: XTransSDataPipe) {
        this.sCheckedData = [];
        this.dCheckedData = [];
    }

    ngOnInit() {
        this.dDataChange();
        this.sSearchValue = new FormControl();
        this.dSearchValue = new FormControl();
        this.sSearchValue.valueChanges.debounceTime(500).subscribe(result => {
            this.sSearchChange.emit(result);
        });
        this.dSearchValue.valueChanges.debounceTime(500).subscribe(result => {
            this.dSearchChange.emit(result);
        });
    }

    private dDataChange() {
        this.dDataKeys = this.dData.map(i => i[this.map._xKey]);
        this.dDataChanged.emit(this.dData);
    }

    public sCheckedChange(e) {
        this.sCheckedData = this.sData.filter(i => i[this.map._xChecked]);
        const sViewData = this.xTransSDataPipe.transform(this.sData, this.map._xKey, this.dDataKeys);
        this.sIndeterminate = this.sCheckedData.length > 0 &&
            this.sCheckedData.length < sViewData.length;
    }

    public dCheckedChange(e) {
        this.dCheckedData = this.dData.filter(i => i[this.map._xChecked]);
        this.dIndeterminate = this.dCheckedData.length > 0 && this.dCheckedData.length < this.dData.length;
    }

    public toRight() {
        this.dData = this.dData.concat(this.sCheckedData.filter(i => this.dDataKeys.indexOf(i[this.map._xKey]) < 0));
        this.dDataChange();
        this.sCheckedData.forEach(i => i[this.map._xChecked] = false);
        this.sCheckedData = [];
        this.sIndeterminate = false;
    }

    public toLeft() {
        this.dData = this.dData.filter(i => !i[this.map._xChecked]);
        this.dDataChange();
        this.dCheckedData.forEach(i => i[this.map._xChecked] = false);
        this.dCheckedData = [];
        this.dIndeterminate = false;
    }

    public sAllCheckedChange(e) {
        if (e) {
            this.sIndeterminate = false;
        }
        const sViewData = this.xTransSDataPipe.transform(this.sData, this.map._xKey, this.dDataKeys);
        sViewData.forEach(i => i[this.map._xChecked] = e);
        this.sCheckedData = sViewData.filter(i => i[this.map._xChecked]);
    }

    public dAllCheckedChange(e) {
        if (e) {
            this.dIndeterminate = false;
        }
        this.dData.forEach(i => i[this.map._xChecked] = e);
        this.dDataChange();
        this.dCheckedData = this.dData.filter(i => i[this.map._xChecked]);
    }

    public listScroll(e, t) {
        const target = e.target;
        if (target.scrollHeight - target.clientHeight - target.scrollTop <= 5) {
            if (t === 's') {
                this.sListOnScroll.emit();
            } else {
                this.dListOnScroll.emit();
            }
        }
    }
}

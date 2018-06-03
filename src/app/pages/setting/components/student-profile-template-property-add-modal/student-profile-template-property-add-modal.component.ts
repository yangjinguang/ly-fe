import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudentProfileProperty} from '../../models/student-profile-property';
import {StudentProfilePropertyTypeTrans} from '../../enums/student-profile-property-type.enum';

@Component({
    selector: 'app-student-profile-template-property-add-modal',
    templateUrl: './student-profile-template-property-add-modal.component.html',
    styleUrls: ['./student-profile-template-property-add-modal.component.scss']
})
export class StudentProfileTemplatePropertyAddModalComponent implements OnInit {
    public propertyForm: FormGroup;
    @Input('property') public property: StudentProfileProperty;
    public typeOpts = StudentProfilePropertyTypeTrans;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.propertyFormBuild();
    }

    private propertyFormBuild() {
        this.propertyForm = this.fb.group({
            name: [this.property && this.property.name, Validators.required],
            type: [this.property && this.property.type, Validators.required],
            size: [this.property && this.property.size[0], Validators.required]
        });
    }

}

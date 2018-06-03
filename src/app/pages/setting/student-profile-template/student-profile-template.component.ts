import {Component, OnInit} from '@angular/core';
import {StudentProfileProperty} from '../models/student-profile-property';
import {StudentApiService} from '../../../services/student-api.service';
import {StudentProfile} from '../models/student-profile';
import {NzModalRef, NzModalService} from 'ng-zorro-antd';
import {StudentProfileTemplatePropertyAddModalComponent} from '../components/student-profile-template-property-add-modal/student-profile-template-property-add-modal.component';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-student-profile-template',
    templateUrl: './student-profile-template.component.html',
    styleUrls: ['./student-profile-template.component.scss'],
    providers: [StudentApiService]
})
export class StudentProfileTemplateComponent implements OnInit {
    public profileTemplate: StudentProfile;
    public properties: StudentProfileProperty[];

    constructor(private studentApi: StudentApiService,
                private modalService: NzModalService) {
        this.properties = [];

    }

    ngOnInit() {
        this.getProfileTemplate();
    }

    private getProfileTemplate() {
        this.studentApi.profileTemplate().subscribe(result => {
            this.profileTemplate = result.data;
            this.properties = this.profileTemplate.properties;
        });
    }

    public addPropertyModalOpen(property?: StudentProfileProperty) {
        const modal = this.modalService.create({
            nzTitle: '添加字段',
            nzContent: StudentProfileTemplatePropertyAddModalComponent,
            nzComponentParams: {
                property: property
            },
            nzFooter: [
                {
                    label: '取消',
                    type: 'default',
                    onClick: () => {
                        modal.close();
                    }
                },
                {
                    label: '确定',
                    type: 'primary',
                    disabled: (a) => a.propertyForm.invalid,
                    onClick: (a) => {
                        this.addProperty(a.propertyForm, modal);
                    }
                }
            ]
        });
    }

    private addProperty(propertyForm: FormGroup, modal: NzModalRef) {
        const property = <StudentProfileProperty>{};
        property.name = propertyForm.get('name').value;
        property.type = propertyForm.get('type').value;
        const sizeX = propertyForm.get('size').value;
        property.size = [sizeX ? Number(sizeX) : 1, 1];
        this.profileTemplate.properties.push(property);
        this.studentApi.updateProfileTemplate(this.profileTemplate.id, this.profileTemplate).subscribe(result => {
            modal.close();
            this.properties = [...this.profileTemplate.properties];
        });
    }

}

import { LightningElement, api } from 'lwc';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';
export default class ContactListFromFlow extends LightningElement {
    @api records = [];
    @api selectedContactId;
    @api title;
    @api fieldColumns = [
        {
            label: 'FirstName',
            fieldName: 'FirstName'
        },
        {
            label: 'LastName',
            fieldName: 'LastName'
        },
        {
            label: 'Email',
            fieldName: 'Email'
        }
    ];
    
    connectedCallback() {
        console.log('This Records: ',this.records);
    }

    handleClick() {
        var el = this.template.querySelector('lightning-datatable');
        console.log('selectedRows ' + el.selectedRows.length);
        if (el.selectedRows.length !== 1) {
            console.log('Please Select atleast one contact to create Task' + el.selectedRows.length);
            const event = new ShowToastEvent({
                title: 'Contact not selected',
                message: 'Please Select atleast one contact to create Task',
            });
            this.dispatchEvent(event);
            return;
        }
        else {
            console.log("getSelectedRows => ", this.template.querySelector('lightning-datatable').getSelectedRows());
            this.selectedContactId = this.template.querySelector('lightning-datatable').getSelectedRows()[0].Id;
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        }
    }
}
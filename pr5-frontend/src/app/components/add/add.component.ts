import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  contact: Contact = {
    username: '',
    email: '',
    mobile: '',
  };
  submitted = false;

  constructor(private contactService: ContactService) {}

  saveContact(): void {
    const data = {
      username: this.contact.username,
      email: this.contact.email,
      mobile: this.contact.mobile,
    };

    this.contactService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newContact(): void {
    this.submitted = false;
    this.contact = {
      username: '',
      email: '',
      mobile: '',
    };
  }
}

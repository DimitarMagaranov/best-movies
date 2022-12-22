import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactUsService } from '../services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['../../auth/login/login.component.scss','./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  alert: boolean = false;
  isSend = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private contactUsService: ContactUsService) { }

  ngOnInit(): void {
  }

  contactUsHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const {name,  email, answer } = form.value;

    this.contactUsService.sendAnswer(name, email, answer).subscribe({
      next: () => {
        this.isSend = true;
        this.alert = true;
        window.scrollTo(0,0);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  closeAlert() {
    this.alert = false;
    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }
}

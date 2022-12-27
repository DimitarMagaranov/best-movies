import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { ConfirmDialogService } from 'src/app/material/confirm-dialog.service';
import { FILTER_PAG_REGEX } from 'src/app/shared/constants';
import { IUser } from 'src/app/shared/interfaces/user';
import { AdminService } from '../admin.service';

//with state
// const fadeInOut = trigger('fadeInOut', [
//   state('open', style({opacity: 1})),
//   state('close', style({opacity: 0})),
//   transition('open => close', [animate('500ms ease-out')]),
//   transition('close => open', [animate('500ms ease-in')]),
// ]);

//normal
// const enterTransition = transition(':enter', [
//   style({
//     opacity: 0,
//   }),
//   animate('500ms ease-in', style({opacity: 1})),
// ]);
// const exitTransition = transition(':leave', [
//   style({
//     opacity: 1,
//   }),
//   animate('500ms ease-out', style({opacity: 0})),
// ]);
// const fadeIn = trigger('fadeIn', [enterTransition]);
// const fadeOut = trigger('fadeOut', [exitTransition]);

//with wild card
// const fadeInOut = trigger('fadeInOut', [
//   state('open', style({opacity: 1})),
//   state('close', style({opacity: 0})),
//   transition('open => *', [animate('500ms ease-out')]),
//   transition('* => open', [animate('500ms ease-in')]),
// ]);

//with void state
const fadeInOut = trigger('fadeInOut', [
  state('in', style({opacity: 1})),
  transition('void => *', [style({opacity: 0}), animate('500ms ease-out')]),
  transition('* => void', [animate('500ms ease-out'), style({opacity: 0})])
])

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../admin/admin.component.scss','./users.component.scss'],
  animations: [fadeInOut]
})
export class UsersComponent implements OnInit {

  users: IUser[] = [];
  allUsers!: IUser[];
  searchTerm!: string;
  page = 1;
  pageSize = 20;
  collectionSize!: number;
  currentRate = 8;
  isHidden = true;

  constructor(private adminService: AdminService, private dialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.adminService.loadUsers().subscribe((users) => {
      this.users = users;
      this.users = this.users.filter(x => x.roles.includes('user'));
      this.allUsers = this.users;
      this.collectionSize = this.users.length;
    })
  }

  search(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    this.users = this.allUsers.filter((val) => val.username.toLowerCase().includes(value));
    this.collectionSize = this.users.length;
  }

	getPageSymbol(current: number) {
		return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
	}

	selectPage(page: string) {
		this.page = parseInt(page, 10) || 1;
	}

	formatInput(input: HTMLInputElement) {
		input.value = input.value.replace(FILTER_PAG_REGEX, '');
	}

  fadeInOut() {
    this.isHidden = !this.isHidden;
  }

  userDeleteDialogHandle(id: string) {
    const options = {
      title: 'Are you sure you want to delete this user?',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'YES',
    };
    
    this.dialogService.open(options);
        
    this.dialogService.confirmed().subscribe(confirmed => {
       if (confirmed) {
            this.deleteUser(id);
          }
        });
  }

  deleteUser(id: string) {
    this.adminService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(x => x._id != id);
    });
  };
}

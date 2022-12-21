import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from 'src/app/material/confirm-dialog.service';
import { IUser } from 'src/app/shared/interfaces/user';
import { AdminService } from '../admin.service';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../admin/admin.component.scss','./users.component.scss']
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

  showTable() {
    this.isHidden = !this.isHidden;
  }

  handleClick(id: string) {
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
  //users/userid
}

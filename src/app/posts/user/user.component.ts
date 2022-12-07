import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, switchMap } from 'rxjs';

import { UsersState } from '././models/user';
import * as UsersActions from './store/actions/users.actions';
import { User } from './models/user';
import { selectUser } from './store/selectors/users.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private readonly destroy$: Subject<void> = new Subject<void>();
  user!: User;
  userForm!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<UsersState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsersActions());
    this.innitUserForm();   
    this.getUser();
  }

  public backToPost(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.router.navigate(['posts','postId',params.get('postId')])
    })
  }

  private getUser(): void {
    this.route.params.pipe(
      switchMap((params) => this.store.select(selectUser(+params['userId']))),
      takeUntil(this.destroy$),
    ).subscribe(user => {
      this.user = user;
      this.patchUserForm();
    })
  }

  private patchUserForm(): void {
    this.userForm.patchValue({ ...this.user });
  }

  private innitUserForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      username: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      website: new FormControl(null, [Validators.required])
    })
  }
}
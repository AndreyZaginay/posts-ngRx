import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersService } from './services/users.service';
import { usersFeature } from './store/reducers/users.reducers';
import { UsersEffects } from './store/effects/users.effects';
import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/shared.module'


@NgModule({
    declarations: [
        UserComponent,
    ],
    imports: [
      CommonModule,
      SharedModule,
      HttpClientModule,
      MatFormFieldModule,
      MatButtonModule,
      MatTableModule,
      MatInputModule,
      MatIconModule,
      ReactiveFormsModule,
      FormsModule,
      StoreModule.forFeature(usersFeature),
      EffectsModule.forFeature([UsersEffects]),
    ],
    providers: [UsersService],
  })
export class UserModule { }
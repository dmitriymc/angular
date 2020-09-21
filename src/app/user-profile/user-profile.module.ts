import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UserProfileRoutingModule,
    FontAwesomeModule,
    NgbModule
  ]
})
export class UserProfileModule { }

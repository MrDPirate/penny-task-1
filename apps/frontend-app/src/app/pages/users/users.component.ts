import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../actions/auth/auth.actions';
import { selectUsers, selectLoading } from '../../selectors/auth/auth.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users$!: Observable<any[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectLoading);
  }
}

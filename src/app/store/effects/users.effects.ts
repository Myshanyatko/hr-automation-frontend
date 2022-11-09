import { getUser, userActions, getUsers } from './../actions/users.actions';
import { EffectsUsersService } from './../../services/effects-users.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap } from 'rxjs';
@Injectable()
export class USersEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      mergeMap(() => this.effectsService.getUsers())
    )
  );
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      exhaustMap((action) => this.effectsService.getUser(action.userId))
    )
  );

  constructor(
    private actions$: Actions,
    private effectsService: EffectsUsersService
  ) {
    console.log('effect');
  }
}

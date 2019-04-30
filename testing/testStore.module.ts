import { Injectable, NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionsSubject, ReducerManager, StateObservable, Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EffectsModule } from '@ngrx/effects';

@Injectable()
export class MockStore<T> extends Store<T> {
  private stateSubject = new BehaviorSubject<T>({} as T);

  constructor(
    state$: StateObservable,
    actionsObserver: ActionsSubject,
    reducerManager: ReducerManager
  ) {
    super(state$, actionsObserver, reducerManager);
    this.source = this.stateSubject.asObservable();
  }

  setState(nextState: T) {
    this.stateSubject.next(nextState);
  }
}

export function provideMockStore() {
  return {
    provide: Store,
    useClass: MockStore
  };
}

@NgModule({
  imports: [
    NoopAnimationsModule,
    RouterTestingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  exports: [
    RouterTestingModule
  ],
  providers: [provideMockStore()]
})
export class TestStoreModule {
  constructor() { }
}

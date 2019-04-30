import { Injectable, Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';



/**
 * @description Safe exit guard service to check add site component can destroy
 * @author Dava
 * @export
 * @class SafeExitGuardService
 * @implements {CanDeactivate}
 */
@Injectable()
export class SafeExitGuardService implements CanDeactivate<Component> {

  /**
   * @description This interface triggers when user navigate from the component.
   */
  canDeactivate(component) {
    return component.canSafeExit();
  }
}

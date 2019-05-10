import { Directive } from '@angular/core';

/**
 * Generated class for the HideFabDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[hide-fab]' // Attribute selector
})
export class HideFabDirective {

  constructor() {
    console.log('Hello HideFabDirective Directive');
  }

}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, HostListener } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
/**
 * @record
 */
export function ICopyCodeTooltips() { }
if (false) {
    /** @type {?|undefined} */
    ICopyCodeTooltips.prototype.copy;
    /** @type {?|undefined} */
    ICopyCodeTooltips.prototype.copied;
}
export class TdCopyCodeButtonComponent {
    constructor() {
        this.copyCodeToClipboard = false;
        /**
         * copyCodeTooltips?: ICopyCodeTooltips
         *
         * Tooltips for copy button to copy and upon copying.
         */
        this.copyCodeTooltips = {};
    }
    /**
     * @return {?}
     */
    get copyTooltip() {
        return this.copyCodeTooltips.copy || 'Copy';
    }
    /**
     * @return {?}
     */
    get copiedTooltip() {
        return this.copyCodeTooltips.copied || 'Copied';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    textCopied(event) {
        if (event) {
            this.tooltip.hide();
            this.tooltip.message = this.copiedTooltip;
            this.tooltip.show();
        }
    }
    /**
     * @return {?}
     */
    initializeTooltip() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.tooltip.message = this.copyTooltip;
        }), 200);
    }
}
TdCopyCodeButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'td-copy-code-button',
                template: "<button\n  mat-icon-button\n  [cdkCopyToClipboard]=\"copiedContent\"\n  class=\"copy-button\"\n  [matTooltip]=\"copyTooltip\"\n  #tooltip=\"matTooltip\"\n  (cdkCopyToClipboardCopied)=\"textCopied($event)\"\n>\n  <mat-icon role=\"img\">content_copy</mat-icon>\n</button>\n",
                styles: [""]
            }] }
];
TdCopyCodeButtonComponent.propDecorators = {
    copiedContent: [{ type: Input }],
    copyCodeToClipboard: [{ type: Input }],
    copyCodeTooltips: [{ type: Input }],
    tooltip: [{ type: ViewChild, args: ['tooltip',] }],
    initializeTooltip: [{ type: HostListener, args: ['mouseleave',] }]
};
if (false) {
    /** @type {?} */
    TdCopyCodeButtonComponent.prototype.copiedContent;
    /** @type {?} */
    TdCopyCodeButtonComponent.prototype.copyCodeToClipboard;
    /**
     * copyCodeTooltips?: ICopyCodeTooltips
     *
     * Tooltips for copy button to copy and upon copying.
     * @type {?}
     */
    TdCopyCodeButtonComponent.prototype.copyCodeTooltips;
    /** @type {?} */
    TdCopyCodeButtonComponent.prototype.tooltip;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1jb2RlLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvaGlnaGxpZ2h0LyIsInNvdXJjZXMiOlsiY29weS1jb2RlLWJ1dHRvbi9jb3B5LWNvZGUtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFFdkQsdUNBR0M7OztJQUZDLGlDQUFjOztJQUNkLG1DQUFnQjs7QUFRbEIsTUFBTSxPQUFPLHlCQUF5QjtJQUx0QztRQVFXLHdCQUFtQixHQUFZLEtBQUssQ0FBQzs7Ozs7O1FBTXJDLHFCQUFnQixHQUFzQixFQUFFLENBQUM7SUF5QnBELENBQUM7Ozs7SUF2QkMsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQztJQUM5QyxDQUFDOzs7O0lBRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQztJQUNsRCxDQUFDOzs7OztJQUlELFVBQVUsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQyxDQUFDLEdBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDOzs7WUF0Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLDJSQUFnRDs7YUFFakQ7Ozs0QkFHRSxLQUFLO2tDQUNMLEtBQUs7K0JBTUwsS0FBSztzQkFVTCxTQUFTLFNBQUMsU0FBUztnQ0FTbkIsWUFBWSxTQUFDLFlBQVk7Ozs7SUExQjFCLGtEQUErQjs7SUFDL0Isd0RBQThDOzs7Ozs7O0lBTTlDLHFEQUFrRDs7SUFVbEQsNENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0VG9vbHRpcCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb3B5Q29kZVRvb2x0aXBzIHtcbiAgY29weT86IHN0cmluZztcbiAgY29waWVkPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ZC1jb3B5LWNvZGUtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvcHktY29kZS1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb3B5LWNvZGUtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFRkQ29weUNvZGVCdXR0b25Db21wb25lbnQge1xuICAvLyBwcml2YXRlIF9jb3B5Q29kZVRvb2x0aXBzOiBJQ29weUNvZGVUb29sdGlwcyA9IHt9O1xuICBASW5wdXQoKSBjb3BpZWRDb250ZW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvcHlDb2RlVG9DbGlwYm9hcmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIGNvcHlDb2RlVG9vbHRpcHM/OiBJQ29weUNvZGVUb29sdGlwc1xuICAgKlxuICAgKiBUb29sdGlwcyBmb3IgY29weSBidXR0b24gdG8gY29weSBhbmQgdXBvbiBjb3B5aW5nLlxuICAgKi9cbiAgQElucHV0KCkgY29weUNvZGVUb29sdGlwczogSUNvcHlDb2RlVG9vbHRpcHMgPSB7fTtcblxuICBnZXQgY29weVRvb2x0aXAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb3B5Q29kZVRvb2x0aXBzLmNvcHkgfHwgJ0NvcHknO1xuICB9XG5cbiAgZ2V0IGNvcGllZFRvb2x0aXAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb3B5Q29kZVRvb2x0aXBzLmNvcGllZCB8fCAnQ29waWVkJztcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ3Rvb2x0aXAnKSB0b29sdGlwOiBNYXRUb29sdGlwO1xuXG4gIHRleHRDb3BpZWQoZXZlbnQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMudG9vbHRpcC5oaWRlKCk7XG4gICAgICB0aGlzLnRvb2x0aXAubWVzc2FnZSA9IHRoaXMuY29waWVkVG9vbHRpcDtcbiAgICAgIHRoaXMudG9vbHRpcC5zaG93KCk7XG4gICAgfVxuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBpbml0aWFsaXplVG9vbHRpcCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudG9vbHRpcC5tZXNzYWdlID0gdGhpcy5jb3B5VG9vbHRpcDtcbiAgICB9LCAyMDApO1xuICB9XG59XG4iXX0=
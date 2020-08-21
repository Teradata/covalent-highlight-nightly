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
        return (this.copyCodeTooltips && this.copyCodeTooltips.copy) || 'Copy';
    }
    /**
     * @return {?}
     */
    get copiedTooltip() {
        return (this.copyCodeTooltips && this.copyCodeTooltips.copied) || 'Copied';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1jb2RlLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvaGlnaGxpZ2h0LyIsInNvdXJjZXMiOlsiY29weS1jb2RlLWJ1dHRvbi9jb3B5LWNvZGUtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFFdkQsdUNBR0M7OztJQUZDLGlDQUFjOztJQUNkLG1DQUFnQjs7QUFRbEIsTUFBTSxPQUFPLHlCQUF5QjtJQUx0QztRQVFXLHdCQUFtQixHQUFZLEtBQUssQ0FBQzs7Ozs7O1FBTXJDLHFCQUFnQixHQUFzQixFQUFFLENBQUM7SUF5QnBELENBQUM7Ozs7SUF2QkMsSUFBSSxXQUFXO1FBQ2IsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDO0lBQ3pFLENBQUM7Ozs7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUM7SUFDN0UsQ0FBQzs7Ozs7SUFJRCxVQUFVLENBQUMsS0FBYztRQUN2QixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7OztJQUVELGlCQUFpQjtRQUNmLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUMsQ0FBQyxHQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQzs7O1lBdENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiwyUkFBZ0Q7O2FBRWpEOzs7NEJBR0UsS0FBSztrQ0FDTCxLQUFLOytCQU1MLEtBQUs7c0JBVUwsU0FBUyxTQUFDLFNBQVM7Z0NBU25CLFlBQVksU0FBQyxZQUFZOzs7O0lBMUIxQixrREFBK0I7O0lBQy9CLHdEQUE4Qzs7Ozs7OztJQU05QyxxREFBa0Q7O0lBVWxELDRDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFRvb2x0aXAgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcblxuZXhwb3J0IGludGVyZmFjZSBJQ29weUNvZGVUb29sdGlwcyB7XG4gIGNvcHk/OiBzdHJpbmc7XG4gIGNvcGllZD86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGQtY29weS1jb2RlLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb3B5LWNvZGUtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29weS1jb2RlLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBUZENvcHlDb2RlQnV0dG9uQ29tcG9uZW50IHtcbiAgLy8gcHJpdmF0ZSBfY29weUNvZGVUb29sdGlwczogSUNvcHlDb2RlVG9vbHRpcHMgPSB7fTtcbiAgQElucHV0KCkgY29waWVkQ29udGVudDogc3RyaW5nO1xuICBASW5wdXQoKSBjb3B5Q29kZVRvQ2xpcGJvYXJkOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBjb3B5Q29kZVRvb2x0aXBzPzogSUNvcHlDb2RlVG9vbHRpcHNcbiAgICpcbiAgICogVG9vbHRpcHMgZm9yIGNvcHkgYnV0dG9uIHRvIGNvcHkgYW5kIHVwb24gY29weWluZy5cbiAgICovXG4gIEBJbnB1dCgpIGNvcHlDb2RlVG9vbHRpcHM6IElDb3B5Q29kZVRvb2x0aXBzID0ge307XG5cbiAgZ2V0IGNvcHlUb29sdGlwKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmNvcHlDb2RlVG9vbHRpcHMgJiYgdGhpcy5jb3B5Q29kZVRvb2x0aXBzLmNvcHkpIHx8ICdDb3B5JztcbiAgfVxuXG4gIGdldCBjb3BpZWRUb29sdGlwKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmNvcHlDb2RlVG9vbHRpcHMgJiYgdGhpcy5jb3B5Q29kZVRvb2x0aXBzLmNvcGllZCkgfHwgJ0NvcGllZCc7XG4gIH1cblxuICBAVmlld0NoaWxkKCd0b29sdGlwJykgdG9vbHRpcDogTWF0VG9vbHRpcDtcblxuICB0ZXh0Q29waWVkKGV2ZW50OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICB0aGlzLnRvb2x0aXAuaGlkZSgpO1xuICAgICAgdGhpcy50b29sdGlwLm1lc3NhZ2UgPSB0aGlzLmNvcGllZFRvb2x0aXA7XG4gICAgICB0aGlzLnRvb2x0aXAuc2hvdygpO1xuICAgIH1cbiAgfVxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgaW5pdGlhbGl6ZVRvb2x0aXAoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRvb2x0aXAubWVzc2FnZSA9IHRoaXMuY29weVRvb2x0aXA7XG4gICAgfSwgMjAwKTtcbiAgfVxufVxuIl19
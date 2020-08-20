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
var TdCopyCodeButtonComponent = /** @class */ (function () {
    function TdCopyCodeButtonComponent() {
        this.copyCodeToClipboard = false;
        /**
         * copyCodeTooltips?: ICopyCodeTooltips
         *
         * Tooltips for copy button to copy and upon copying.
         */
        this.copyCodeTooltips = {};
    }
    Object.defineProperty(TdCopyCodeButtonComponent.prototype, "copyTooltip", {
        get: /**
         * @return {?}
         */
        function () {
            return this.copyCodeTooltips.copy || 'Copy';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdCopyCodeButtonComponent.prototype, "copiedTooltip", {
        get: /**
         * @return {?}
         */
        function () {
            return this.copyCodeTooltips.copied || 'Copied';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    TdCopyCodeButtonComponent.prototype.textCopied = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event) {
            this.tooltip.hide();
            this.tooltip.message = this.copiedTooltip;
            this.tooltip.show();
        }
    };
    /**
     * @return {?}
     */
    TdCopyCodeButtonComponent.prototype.initializeTooltip = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.tooltip.message = _this.copyTooltip;
        }), 200);
    };
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
    return TdCopyCodeButtonComponent;
}());
export { TdCopyCodeButtonComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1jb2RlLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvaGlnaGxpZ2h0LyIsInNvdXJjZXMiOlsiY29weS1jb2RlLWJ1dHRvbi9jb3B5LWNvZGUtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFFdkQsdUNBR0M7OztJQUZDLGlDQUFjOztJQUNkLG1DQUFnQjs7QUFHbEI7SUFBQTtRQVFXLHdCQUFtQixHQUFZLEtBQUssQ0FBQzs7Ozs7O1FBTXJDLHFCQUFnQixHQUFzQixFQUFFLENBQUM7SUF5QnBELENBQUM7SUF2QkMsc0JBQUksa0RBQVc7Ozs7UUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSSxNQUFNLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvREFBYTs7OztRQUFqQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7Ozs7O0lBSUQsOENBQVU7Ozs7SUFBVixVQUFXLEtBQWM7UUFDdkIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7Ozs7SUFFRCxxREFBaUI7OztJQURqQjtRQUFBLGlCQUtDO1FBSEMsVUFBVTs7O1FBQUM7WUFDVCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFDLENBQUMsR0FBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7O2dCQXRDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsMlJBQWdEOztpQkFFakQ7OztnQ0FHRSxLQUFLO3NDQUNMLEtBQUs7bUNBTUwsS0FBSzswQkFVTCxTQUFTLFNBQUMsU0FBUztvQ0FTbkIsWUFBWSxTQUFDLFlBQVk7O0lBTTVCLGdDQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0FsQ1kseUJBQXlCOzs7SUFFcEMsa0RBQStCOztJQUMvQix3REFBOEM7Ozs7Ozs7SUFNOUMscURBQWtEOztJQVVsRCw0Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRUb29sdGlwIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvcHlDb2RlVG9vbHRpcHMge1xuICBjb3B5Pzogc3RyaW5nO1xuICBjb3BpZWQ/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RkLWNvcHktY29kZS1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vY29weS1jb2RlLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvcHktY29kZS1idXR0b24uY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgVGRDb3B5Q29kZUJ1dHRvbkNvbXBvbmVudCB7XG4gIC8vIHByaXZhdGUgX2NvcHlDb2RlVG9vbHRpcHM6IElDb3B5Q29kZVRvb2x0aXBzID0ge307XG4gIEBJbnB1dCgpIGNvcGllZENvbnRlbnQ6IHN0cmluZztcbiAgQElucHV0KCkgY29weUNvZGVUb0NsaXBib2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuICAvKipcbiAgICogY29weUNvZGVUb29sdGlwcz86IElDb3B5Q29kZVRvb2x0aXBzXG4gICAqXG4gICAqIFRvb2x0aXBzIGZvciBjb3B5IGJ1dHRvbiB0byBjb3B5IGFuZCB1cG9uIGNvcHlpbmcuXG4gICAqL1xuICBASW5wdXQoKSBjb3B5Q29kZVRvb2x0aXBzOiBJQ29weUNvZGVUb29sdGlwcyA9IHt9O1xuXG4gIGdldCBjb3B5VG9vbHRpcCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvcHlDb2RlVG9vbHRpcHMuY29weSB8fCAnQ29weSc7XG4gIH1cblxuICBnZXQgY29waWVkVG9vbHRpcCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvcHlDb2RlVG9vbHRpcHMuY29waWVkIHx8ICdDb3BpZWQnO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgndG9vbHRpcCcpIHRvb2x0aXA6IE1hdFRvb2x0aXA7XG5cbiAgdGV4dENvcGllZChldmVudDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgdGhpcy50b29sdGlwLmhpZGUoKTtcbiAgICAgIHRoaXMudG9vbHRpcC5tZXNzYWdlID0gdGhpcy5jb3BpZWRUb29sdGlwO1xuICAgICAgdGhpcy50b29sdGlwLnNob3coKTtcbiAgICB9XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIGluaXRpYWxpemVUb29sdGlwKCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50b29sdGlwLm1lc3NhZ2UgPSB0aGlzLmNvcHlUb29sdGlwO1xuICAgIH0sIDIwMCk7XG4gIH1cbn1cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, Output, EventEmitter, Renderer2, SecurityContext, ViewChild, ChangeDetectorRef, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTooltip } from '@angular/material/tooltip';
/* tslint:disable-next-line */
/** @type {?} */
var hljs = require('highlight.js/lib');
var TdHighlightComponent = /** @class */ (function () {
    function TdHighlightComponent(_renderer, _elementRef, _domSanitizer, cdr) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._domSanitizer = _domSanitizer;
        this.cdr = cdr;
        this._initialized = false;
        this._lang = 'typescript';
        /**
         * copyCodeToClipboard?: boolean
         *
         * Display copy button on code snippets to copy code to clipboard.
         */
        this.copyCodeToClipboard = false;
        /**
         * copyCodeTooltips?: ICopyCodeTooltips
         *
         * Tooltips for copy button to copy and upon copying.
         */
        this.copyCodeTooltips = {};
        /**
         * contentReady?: function
         * Event emitted after the highlight content rendering is finished.
         */
        this.contentReady = new EventEmitter();
    }
    Object.defineProperty(TdHighlightComponent.prototype, "content", {
        /**
         * content?: string
         *
         * Code content to be parsed as highlighted html.
         * Used to load data dynamically.
         *
         * e.g. `.html`, `.ts` , etc.
         */
        set: /**
         * content?: string
         *
         * Code content to be parsed as highlighted html.
         * Used to load data dynamically.
         *
         * e.g. `.html`, `.ts` , etc.
         * @param {?} content
         * @return {?}
         */
        function (content) {
            this._content = content;
            if (this._initialized) {
                this._loadContent(this._content);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdHighlightComponent.prototype, "lang", {
        /**
         * lang?: string
         *
         * Language of the code content to be parsed as highlighted html.
         * Defaults to `typescript`
         *
         * e.g. `typescript`, `html` , etc.
         */
        set: /**
         * lang?: string
         *
         * Language of the code content to be parsed as highlighted html.
         * Defaults to `typescript`
         *
         * e.g. `typescript`, `html` , etc.
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            if (!lang) {
                throw new Error('Error: language attribute must be defined in TdHighlightComponent.');
            }
            this._lang = lang;
            if (this._initialized) {
                this._loadContent(this._content);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TdHighlightComponent.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    TdHighlightComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (!this._content) {
            this._loadContent(((/** @type {?} */ (this.highlightComp.nativeElement))).textContent);
        }
        else {
            this._loadContent(this._content);
        }
        this._initialized = true;
    };
    /**
     * General method to parse a string of code into HTML Elements and load them into the container
     */
    /**
     * General method to parse a string of code into HTML Elements and load them into the container
     * @private
     * @param {?} code
     * @return {?}
     */
    TdHighlightComponent.prototype._loadContent = /**
     * General method to parse a string of code into HTML Elements and load them into the container
     * @private
     * @param {?} code
     * @return {?}
     */
    function (code) {
        if (code && code.trim().length > 0) {
            // Clean container
            this._renderer.setProperty(this._elementRef.nativeElement, 'innerHTML', '');
            // Parse html string into actual HTML elements.
            this._elementFromString(this._render(code));
            if (this.copyCodeToClipboard) {
                this._renderer.appendChild(this._elementRef.nativeElement, this.copyComp.nativeElement);
            }
        }
        this.contentReady.emit();
    };
    /**
     * @private
     * @param {?} codeStr
     * @return {?}
     */
    TdHighlightComponent.prototype._elementFromString = /**
     * @private
     * @param {?} codeStr
     * @return {?}
     */
    function (codeStr) {
        // Renderer2 doesnt have a parsing method, so we have to sanitize and use [innerHTML]
        // to parse the string into DOM element for now.
        /** @type {?} */
        var preElement = this._renderer.createElement('pre');
        this._renderer.appendChild(this._elementRef.nativeElement, preElement);
        /** @type {?} */
        var codeElement = this._renderer.createElement('code');
        this._renderer.appendChild(preElement, codeElement);
        // Set .highlight class into <code> element
        this._renderer.addClass(codeElement, 'highlight');
        codeElement.innerHTML = this._domSanitizer.sanitize(SecurityContext.HTML, codeStr);
        return preElement;
    };
    /**
     * @private
     * @param {?} contents
     * @return {?}
     */
    TdHighlightComponent.prototype._render = /**
     * @private
     * @param {?} contents
     * @return {?}
     */
    function (contents) {
        // Trim leading and trailing newlines
        contents = contents.replace(/^(\s|\t)*\n+/g, '').replace(/(\s|\t)*\n+(\s|\t)*$/g, '');
        // Split markup by line characters
        /** @type {?} */
        var lines = contents.split('\n');
        // check how much indentation is used by the first actual code line
        /** @type {?} */
        var firstLineWhitespace = lines[0].match(/^(\s|\t)*/)[0];
        // Remove all indentation spaces so code can be parsed correctly
        /** @type {?} */
        var startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
        lines = lines.map((/**
         * @param {?} line
         * @return {?}
         */
        function (line) {
            return line
                .replace('=""', '') // remove empty values
                .replace(startingWhitespaceRegex, '')
                .replace(/\s+$/, ''); // remove trailing white spaces
        }));
        /** @type {?} */
        var codeToParse = lines
            .join('\n')
            .replace(/\{ \{/gi, '{{')
            .replace(/\} \}/gi, '}}')
            .replace(/&lt;/gi, '<')
            .replace(/&gt;/gi, '>');
        this.copyContent = codeToParse;
        // Parse code with highlight.js depending on language
        /** @type {?} */
        var highlightedCode = hljs.highlight(this._lang, codeToParse, true);
        highlightedCode.value = highlightedCode.value
            .replace(/=<span class="hljs-value">""<\/span>/gi, '')
            .replace('<head>', '')
            .replace('<head/>', '');
        return highlightedCode.value;
    };
    TdHighlightComponent.decorators = [
        { type: Component, args: [{
                    selector: 'td-highlight',
                    template: "<div>\n  <div #highlightComponent>\n    <ng-content></ng-content>\n  </div>\n\n  <div #copyComponent *ngIf=\"copyCodeToClipboard\">\n    <td-copy-code-button\n      [copiedContent]=\"copyContent\"\n      [copyCodeToClipboard]=\"copyCodeToClipboard\"\n      [copyCodeTooltips]=\"copyCodeTooltips\"\n    ></td-copy-code-button>\n  </div>\n</div>\n",
                    styles: [":host ::ng-deep{overflow-x:auto;padding:16px}:host ::ng-deep .highlight,:host ::ng-deep code,:host ::ng-deep pre{font-family:Menlo,Monaco,\"Andale Mono\",\"lucida console\",\"Courier New\",monospace}:host ::ng-deep pre{display:block;overflow-x:auto;padding:0;margin:0;background:0 0;font-family:Menlo,Monaco,\"Andale Mono\",\"lucida console\",\"Courier New\",monospace;line-height:1.45;-moz-tab-size:2;-o-tab-size:2;tab-size:2;-webkit-font-smoothing:auto;-webkit-text-size-adjust:none;position:relative;border-radius:2px;font-size:.8rem;width:100%}:host ::ng-deep code{margin:0;padding:0;overflow-wrap:break-word;white-space:pre-wrap}:host ::ng-deep .highlight{display:block;overflow-wrap:break-word;line-height:1.5;margin:0}:host ::ng-deep .copy-button{border:none;background:inherit;margin-top:-8px;margin-right:-8px}"]
                }] }
    ];
    /** @nocollapse */
    TdHighlightComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: DomSanitizer },
        { type: ChangeDetectorRef }
    ]; };
    TdHighlightComponent.propDecorators = {
        content: [{ type: Input, args: ['content',] }],
        copyCodeToClipboard: [{ type: Input }],
        copyCodeTooltips: [{ type: Input }],
        lang: [{ type: Input, args: ['lang',] }],
        contentReady: [{ type: Output }],
        highlightComp: [{ type: ViewChild, args: ['highlightComponent',] }],
        copyComp: [{ type: ViewChild, args: ['copyComponent',] }],
        tooltip: [{ type: ViewChild, args: ['tooltip',] }]
    };
    return TdHighlightComponent;
}());
export { TdHighlightComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TdHighlightComponent.prototype._initialized;
    /**
     * @type {?}
     * @private
     */
    TdHighlightComponent.prototype._content;
    /**
     * @type {?}
     * @private
     */
    TdHighlightComponent.prototype._lang;
    /**
     * copyCodeToClipboard?: boolean
     *
     * Display copy button on code snippets to copy code to clipboard.
     * @type {?}
     */
    TdHighlightComponent.prototype.copyCodeToClipboard;
    /**
     * copyCodeTooltips?: ICopyCodeTooltips
     *
     * Tooltips for copy button to copy and upon copying.
     * @type {?}
     */
    TdHighlightComponent.prototype.copyCodeTooltips;
    /** @type {?} */
    TdHighlightComponent.prototype.copyContent;
    /**
     * contentReady?: function
     * Event emitted after the highlight content rendering is finished.
     * @type {?}
     */
    TdHighlightComponent.prototype.contentReady;
    /** @type {?} */
    TdHighlightComponent.prototype.highlightComp;
    /** @type {?} */
    TdHighlightComponent.prototype.copyComp;
    /** @type {?} */
    TdHighlightComponent.prototype.tooltip;
    /**
     * @type {?}
     * @private
     */
    TdHighlightComponent.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    TdHighlightComponent.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    TdHighlightComponent.prototype._domSanitizer;
    /**
     * @type {?}
     * @private
     */
    TdHighlightComponent.prototype.cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9oaWdobGlnaHQvIiwic291cmNlcyI6WyJoaWdobGlnaHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxpQkFBaUIsR0FHbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0lBS25ELElBQUksR0FBUSxPQUFPLENBQUMsa0JBQWtCLENBQUM7QUFFM0M7SUF3RUUsOEJBQ1UsU0FBb0IsRUFDcEIsV0FBdUIsRUFDdkIsYUFBMkIsRUFDM0IsR0FBc0I7UUFIdEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXRFeEIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFHOUIsVUFBSyxHQUFXLFlBQVksQ0FBQzs7Ozs7O1FBdUI1Qix3QkFBbUIsR0FBWSxLQUFLLENBQUM7Ozs7OztRQU9yQyxxQkFBZ0IsR0FBc0IsRUFBRSxDQUFDOzs7OztRQTJCeEMsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQVduRSxDQUFDO0lBMURKLHNCQUNJLHlDQUFPO1FBVFg7Ozs7Ozs7V0FPRzs7Ozs7Ozs7Ozs7UUFDSCxVQUNZLE9BQWU7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQztRQUNILENBQUM7OztPQUFBO0lBd0JELHNCQUNJLHNDQUFJO1FBVFI7Ozs7Ozs7V0FPRzs7Ozs7Ozs7Ozs7UUFDSCxVQUNTLElBQVk7WUFDbkIsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxNQUFNLElBQUksS0FBSyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7YUFDdkY7WUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7SUFxQkQsaURBQWtCOzs7SUFBbEI7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCw4Q0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsbUJBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2hGO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNLLDJDQUFZOzs7Ozs7SUFBcEIsVUFBcUIsSUFBWTtRQUMvQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQyxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzVFLCtDQUErQztZQUMvQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3pGO1NBQ0Y7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7OztJQUVPLGlEQUFrQjs7Ozs7SUFBMUIsVUFBMkIsT0FBZTs7OztZQUdsQyxVQUFVLEdBQW1CLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQzs7WUFDakUsV0FBVyxHQUFnQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDckUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELDJDQUEyQztRQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEQsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25GLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7OztJQUVPLHNDQUFPOzs7OztJQUFmLFVBQWdCLFFBQWdCO1FBQzlCLHFDQUFxQztRQUNyQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7WUFFbEYsS0FBSyxHQUFhLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7WUFHcEMsbUJBQW1CLEdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7OztZQUc1RCx1QkFBdUIsR0FBVyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsbUJBQW1CLENBQUM7UUFDN0UsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHOzs7O1FBQUMsVUFBVSxJQUFZO1lBQ3RDLE9BQU8sSUFBSTtpQkFDUixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQjtpQkFDekMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQztpQkFDcEMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLCtCQUErQjtRQUN6RCxDQUFDLEVBQUMsQ0FBQzs7WUFFRyxXQUFXLEdBQVcsS0FBSzthQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ1YsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7YUFDeEIsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7YUFDeEIsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7YUFDdEIsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7OztZQUV6QixlQUFlLEdBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUM7UUFDMUUsZUFBZSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsS0FBSzthQUMxQyxPQUFPLENBQUMsd0NBQXdDLEVBQUUsRUFBRSxDQUFDO2FBQ3JELE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUIsT0FBTyxlQUFlLENBQUMsS0FBSyxDQUFDO0lBQy9CLENBQUM7O2dCQXpKRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBRXhCLHFXQUF5Qzs7aUJBQzFDOzs7O2dCQW5CQyxTQUFTO2dCQUpULFVBQVU7Z0JBV0gsWUFBWTtnQkFKbkIsaUJBQWlCOzs7MEJBK0JoQixLQUFLLFNBQUMsU0FBUztzQ0FhZixLQUFLO21DQU9MLEtBQUs7dUJBVUwsS0FBSyxTQUFDLE1BQU07K0JBaUJaLE1BQU07Z0NBQ04sU0FBUyxTQUFDLG9CQUFvQjsyQkFDOUIsU0FBUyxTQUFDLGVBQWU7MEJBRXpCLFNBQVMsU0FBQyxTQUFTOztJQW9GdEIsMkJBQUM7Q0FBQSxBQTFKRCxJQTBKQztTQXJKWSxvQkFBb0I7Ozs7OztJQUMvQiw0Q0FBc0M7Ozs7O0lBRXRDLHdDQUF5Qjs7Ozs7SUFDekIscUNBQXFDOzs7Ozs7O0lBdUJyQyxtREFBOEM7Ozs7Ozs7SUFPOUMsZ0RBQWtEOztJQXFCbEQsMkNBQW9COzs7Ozs7SUFNcEIsNENBQXNFOztJQUN0RSw2Q0FBMkQ7O0lBQzNELHdDQUFpRDs7SUFFakQsdUNBQTBDOzs7OztJQUd4Qyx5Q0FBNEI7Ozs7O0lBQzVCLDJDQUErQjs7Ozs7SUFDL0IsNkNBQW1DOzs7OztJQUNuQyxtQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEFmdGVyVmlld0luaXQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgUmVuZGVyZXIyLFxuICBTZWN1cml0eUNvbnRleHQsXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTWF0VG9vbHRpcCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgSUNvcHlDb2RlVG9vbHRpcHMgfSBmcm9tICcuJztcblxuZGVjbGFyZSBjb25zdCByZXF1aXJlOiBhbnk7XG4vKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbmxldCBobGpzOiBhbnkgPSByZXF1aXJlKCdoaWdobGlnaHQuanMvbGliJyk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RkLWhpZ2hsaWdodCcsXG4gIHN0eWxlVXJsczogWycuL2hpZ2hsaWdodC5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJy4vaGlnaGxpZ2h0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgVGRIaWdobGlnaHRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlclZpZXdDaGVja2VkIHtcbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9jb250ZW50OiBzdHJpbmc7XG4gIHByaXZhdGUgX2xhbmc6IHN0cmluZyA9ICd0eXBlc2NyaXB0JztcblxuICAvKipcbiAgICogY29udGVudD86IHN0cmluZ1xuICAgKlxuICAgKiBDb2RlIGNvbnRlbnQgdG8gYmUgcGFyc2VkIGFzIGhpZ2hsaWdodGVkIGh0bWwuXG4gICAqIFVzZWQgdG8gbG9hZCBkYXRhIGR5bmFtaWNhbGx5LlxuICAgKlxuICAgKiBlLmcuIGAuaHRtbGAsIGAudHNgICwgZXRjLlxuICAgKi9cbiAgQElucHV0KCdjb250ZW50JylcbiAgc2V0IGNvbnRlbnQoY29udGVudDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9sb2FkQ29udGVudCh0aGlzLl9jb250ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY29weUNvZGVUb0NsaXBib2FyZD86IGJvb2xlYW5cbiAgICpcbiAgICogRGlzcGxheSBjb3B5IGJ1dHRvbiBvbiBjb2RlIHNuaXBwZXRzIHRvIGNvcHkgY29kZSB0byBjbGlwYm9hcmQuXG4gICAqL1xuICBASW5wdXQoKSBjb3B5Q29kZVRvQ2xpcGJvYXJkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIGNvcHlDb2RlVG9vbHRpcHM/OiBJQ29weUNvZGVUb29sdGlwc1xuICAgKlxuICAgKiBUb29sdGlwcyBmb3IgY29weSBidXR0b24gdG8gY29weSBhbmQgdXBvbiBjb3B5aW5nLlxuICAgKi9cbiAgQElucHV0KCkgY29weUNvZGVUb29sdGlwczogSUNvcHlDb2RlVG9vbHRpcHMgPSB7fTtcblxuICAvKipcbiAgICogbGFuZz86IHN0cmluZ1xuICAgKlxuICAgKiBMYW5ndWFnZSBvZiB0aGUgY29kZSBjb250ZW50IHRvIGJlIHBhcnNlZCBhcyBoaWdobGlnaHRlZCBodG1sLlxuICAgKiBEZWZhdWx0cyB0byBgdHlwZXNjcmlwdGBcbiAgICpcbiAgICogZS5nLiBgdHlwZXNjcmlwdGAsIGBodG1sYCAsIGV0Yy5cbiAgICovXG4gIEBJbnB1dCgnbGFuZycpXG4gIHNldCBsYW5nKGxhbmc6IHN0cmluZykge1xuICAgIGlmICghbGFuZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvcjogbGFuZ3VhZ2UgYXR0cmlidXRlIG11c3QgYmUgZGVmaW5lZCBpbiBUZEhpZ2hsaWdodENvbXBvbmVudC4nKTtcbiAgICB9XG4gICAgdGhpcy5fbGFuZyA9IGxhbmc7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9sb2FkQ29udGVudCh0aGlzLl9jb250ZW50KTtcbiAgICB9XG4gIH1cblxuICBjb3B5Q29udGVudDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBjb250ZW50UmVhZHk/OiBmdW5jdGlvblxuICAgKiBFdmVudCBlbWl0dGVkIGFmdGVyIHRoZSBoaWdobGlnaHQgY29udGVudCByZW5kZXJpbmcgaXMgZmluaXNoZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgY29udGVudFJlYWR5OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBWaWV3Q2hpbGQoJ2hpZ2hsaWdodENvbXBvbmVudCcpIGhpZ2hsaWdodENvbXA6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NvcHlDb21wb25lbnQnKSBjb3B5Q29tcDogRWxlbWVudFJlZjtcblxuICBAVmlld0NoaWxkKCd0b29sdGlwJykgdG9vbHRpcDogTWF0VG9vbHRpcDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRlbnQpIHtcbiAgICAgIHRoaXMuX2xvYWRDb250ZW50KCg8SFRNTEVsZW1lbnQ+dGhpcy5oaWdobGlnaHRDb21wLm5hdGl2ZUVsZW1lbnQpLnRleHRDb250ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbG9hZENvbnRlbnQodGhpcy5fY29udGVudCk7XG4gICAgfVxuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmFsIG1ldGhvZCB0byBwYXJzZSBhIHN0cmluZyBvZiBjb2RlIGludG8gSFRNTCBFbGVtZW50cyBhbmQgbG9hZCB0aGVtIGludG8gdGhlIGNvbnRhaW5lclxuICAgKi9cbiAgcHJpdmF0ZSBfbG9hZENvbnRlbnQoY29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGNvZGUgJiYgY29kZS50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgLy8gQ2xlYW4gY29udGFpbmVyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCAnJyk7XG4gICAgICAvLyBQYXJzZSBodG1sIHN0cmluZyBpbnRvIGFjdHVhbCBIVE1MIGVsZW1lbnRzLlxuICAgICAgdGhpcy5fZWxlbWVudEZyb21TdHJpbmcodGhpcy5fcmVuZGVyKGNvZGUpKTtcbiAgICAgIGlmICh0aGlzLmNvcHlDb2RlVG9DbGlwYm9hcmQpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmNvcHlDb21wLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbnRlbnRSZWFkeS5lbWl0KCk7XG4gIH1cblxuICBwcml2YXRlIF9lbGVtZW50RnJvbVN0cmluZyhjb2RlU3RyOiBzdHJpbmcpOiBIVE1MUHJlRWxlbWVudCB7XG4gICAgLy8gUmVuZGVyZXIyIGRvZXNudCBoYXZlIGEgcGFyc2luZyBtZXRob2QsIHNvIHdlIGhhdmUgdG8gc2FuaXRpemUgYW5kIHVzZSBbaW5uZXJIVE1MXVxuICAgIC8vIHRvIHBhcnNlIHRoZSBzdHJpbmcgaW50byBET00gZWxlbWVudCBmb3Igbm93LlxuICAgIGNvbnN0IHByZUVsZW1lbnQ6IEhUTUxQcmVFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBwcmVFbGVtZW50KTtcbiAgICBjb25zdCBjb2RlRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQocHJlRWxlbWVudCwgY29kZUVsZW1lbnQpO1xuICAgIC8vIFNldCAuaGlnaGxpZ2h0IGNsYXNzIGludG8gPGNvZGU+IGVsZW1lbnRcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhjb2RlRWxlbWVudCwgJ2hpZ2hsaWdodCcpO1xuICAgIGNvZGVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX2RvbVNhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuSFRNTCwgY29kZVN0cik7XG4gICAgcmV0dXJuIHByZUVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIF9yZW5kZXIoY29udGVudHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gVHJpbSBsZWFkaW5nIGFuZCB0cmFpbGluZyBuZXdsaW5lc1xuICAgIGNvbnRlbnRzID0gY29udGVudHMucmVwbGFjZSgvXihcXHN8XFx0KSpcXG4rL2csICcnKS5yZXBsYWNlKC8oXFxzfFxcdCkqXFxuKyhcXHN8XFx0KSokL2csICcnKTtcbiAgICAvLyBTcGxpdCBtYXJrdXAgYnkgbGluZSBjaGFyYWN0ZXJzXG4gICAgbGV0IGxpbmVzOiBzdHJpbmdbXSA9IGNvbnRlbnRzLnNwbGl0KCdcXG4nKTtcblxuICAgIC8vIGNoZWNrIGhvdyBtdWNoIGluZGVudGF0aW9uIGlzIHVzZWQgYnkgdGhlIGZpcnN0IGFjdHVhbCBjb2RlIGxpbmVcbiAgICBjb25zdCBmaXJzdExpbmVXaGl0ZXNwYWNlOiBzdHJpbmcgPSBsaW5lc1swXS5tYXRjaCgvXihcXHN8XFx0KSovKVswXTtcblxuICAgIC8vIFJlbW92ZSBhbGwgaW5kZW50YXRpb24gc3BhY2VzIHNvIGNvZGUgY2FuIGJlIHBhcnNlZCBjb3JyZWN0bHlcbiAgICBjb25zdCBzdGFydGluZ1doaXRlc3BhY2VSZWdleDogUmVnRXhwID0gbmV3IFJlZ0V4cCgnXicgKyBmaXJzdExpbmVXaGl0ZXNwYWNlKTtcbiAgICBsaW5lcyA9IGxpbmVzLm1hcChmdW5jdGlvbiAobGluZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBsaW5lXG4gICAgICAgIC5yZXBsYWNlKCc9XCJcIicsICcnKSAvLyByZW1vdmUgZW1wdHkgdmFsdWVzXG4gICAgICAgIC5yZXBsYWNlKHN0YXJ0aW5nV2hpdGVzcGFjZVJlZ2V4LCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1xccyskLywgJycpOyAvLyByZW1vdmUgdHJhaWxpbmcgd2hpdGUgc3BhY2VzXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2RlVG9QYXJzZTogc3RyaW5nID0gbGluZXNcbiAgICAgIC5qb2luKCdcXG4nKVxuICAgICAgLnJlcGxhY2UoL1xceyBcXHsvZ2ksICd7eycpXG4gICAgICAucmVwbGFjZSgvXFx9IFxcfS9naSwgJ319JylcbiAgICAgIC5yZXBsYWNlKC8mbHQ7L2dpLCAnPCcpXG4gICAgICAucmVwbGFjZSgvJmd0Oy9naSwgJz4nKTsgLy8gcmVwbGFjZSB3aXRoIDwgYW5kID4gdG8gcmVuZGVyIEhUTUwgaW4gQW5ndWxhclxuICAgIHRoaXMuY29weUNvbnRlbnQgPSBjb2RlVG9QYXJzZTtcbiAgICAvLyBQYXJzZSBjb2RlIHdpdGggaGlnaGxpZ2h0LmpzIGRlcGVuZGluZyBvbiBsYW5ndWFnZVxuICAgIGNvbnN0IGhpZ2hsaWdodGVkQ29kZTogYW55ID0gaGxqcy5oaWdobGlnaHQodGhpcy5fbGFuZywgY29kZVRvUGFyc2UsIHRydWUpO1xuICAgIGhpZ2hsaWdodGVkQ29kZS52YWx1ZSA9IGhpZ2hsaWdodGVkQ29kZS52YWx1ZVxuICAgICAgLnJlcGxhY2UoLz08c3BhbiBjbGFzcz1cImhsanMtdmFsdWVcIj5cIlwiPFxcL3NwYW4+L2dpLCAnJylcbiAgICAgIC5yZXBsYWNlKCc8aGVhZD4nLCAnJylcbiAgICAgIC5yZXBsYWNlKCc8aGVhZC8+JywgJycpO1xuICAgIHJldHVybiBoaWdobGlnaHRlZENvZGUudmFsdWU7XG4gIH1cbn1cbiJdfQ==
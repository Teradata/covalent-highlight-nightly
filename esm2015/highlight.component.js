/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, Output, EventEmitter, Renderer2, SecurityContext, ViewChild, ChangeDetectorRef, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTooltip } from '@angular/material/tooltip';
/* tslint:disable-next-line */
/** @type {?} */
let hljs = require('highlight.js/lib');
export class TdHighlightComponent {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     * @param {?} _domSanitizer
     * @param {?} cdr
     */
    constructor(_renderer, _elementRef, _domSanitizer, cdr) {
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
    /**
     * content?: string
     *
     * Code content to be parsed as highlighted html.
     * Used to load data dynamically.
     *
     * e.g. `.html`, `.ts` , etc.
     * @param {?} content
     * @return {?}
     */
    set content(content) {
        this._content = content;
        if (this._initialized) {
            this._loadContent(this._content);
        }
    }
    /**
     * lang?: string
     *
     * Language of the code content to be parsed as highlighted html.
     * Defaults to `typescript`
     *
     * e.g. `typescript`, `html` , etc.
     * @param {?} lang
     * @return {?}
     */
    set lang(lang) {
        if (!lang) {
            throw new Error('Error: language attribute must be defined in TdHighlightComponent.');
        }
        this._lang = lang;
        if (this._initialized) {
            this._loadContent(this._content);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this._content) {
            this._loadContent(((/** @type {?} */ (this.highlightComp.nativeElement))).textContent);
        }
        else {
            this._loadContent(this._content);
        }
        this._initialized = true;
    }
    /**
     * General method to parse a string of code into HTML Elements and load them into the container
     * @private
     * @param {?} code
     * @return {?}
     */
    _loadContent(code) {
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
    }
    /**
     * @private
     * @param {?} codeStr
     * @return {?}
     */
    _elementFromString(codeStr) {
        // Renderer2 doesnt have a parsing method, so we have to sanitize and use [innerHTML]
        // to parse the string into DOM element for now.
        /** @type {?} */
        const preElement = this._renderer.createElement('pre');
        this._renderer.appendChild(this._elementRef.nativeElement, preElement);
        /** @type {?} */
        const codeElement = this._renderer.createElement('code');
        this._renderer.appendChild(preElement, codeElement);
        // Set .highlight class into <code> element
        this._renderer.addClass(codeElement, 'highlight');
        codeElement.innerHTML = this._domSanitizer.sanitize(SecurityContext.HTML, codeStr);
        return preElement;
    }
    /**
     * @private
     * @param {?} contents
     * @return {?}
     */
    _render(contents) {
        // Trim leading and trailing newlines
        contents = contents.replace(/^(\s|\t)*\n+/g, '').replace(/(\s|\t)*\n+(\s|\t)*$/g, '');
        // Split markup by line characters
        /** @type {?} */
        let lines = contents.split('\n');
        // check how much indentation is used by the first actual code line
        /** @type {?} */
        const firstLineWhitespace = lines[0].match(/^(\s|\t)*/)[0];
        // Remove all indentation spaces so code can be parsed correctly
        /** @type {?} */
        const startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
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
        const codeToParse = lines
            .join('\n')
            .replace(/\{ \{/gi, '{{')
            .replace(/\} \}/gi, '}}')
            .replace(/&lt;/gi, '<')
            .replace(/&gt;/gi, '>');
        this.copyContent = codeToParse;
        // Parse code with highlight.js depending on language
        /** @type {?} */
        const highlightedCode = hljs.highlight(this._lang, codeToParse, true);
        highlightedCode.value = highlightedCode.value
            .replace(/=<span class="hljs-value">""<\/span>/gi, '')
            .replace('<head>', '')
            .replace('<head/>', '');
        return highlightedCode.value;
    }
}
TdHighlightComponent.decorators = [
    { type: Component, args: [{
                selector: 'td-highlight',
                template: "<div>\n  <div #highlightComponent>\n    <ng-content></ng-content>\n  </div>\n\n  <div #copyComponent *ngIf=\"copyCodeToClipboard\">\n    <td-copy-code-button\n      [copiedContent]=\"copyContent\"\n      [copyCodeToClipboard]=\"copyCodeToClipboard\"\n      [copyCodeTooltips]=\"copyCodeTooltips\"\n    ></td-copy-code-button>\n  </div>\n</div>\n",
                styles: [":host ::ng-deep{overflow-x:auto;padding:16px;display:-ms-flexbox;display:flex}:host ::ng-deep .highlight,:host ::ng-deep code,:host ::ng-deep pre{font-family:Menlo,Monaco,\"Andale Mono\",\"lucida console\",\"Courier New\",monospace}:host ::ng-deep pre{display:block;overflow-x:auto;padding:0;margin:0;background:0 0;font-family:Menlo,Monaco,\"Andale Mono\",\"lucida console\",\"Courier New\",monospace;line-height:1.45;-moz-tab-size:2;-o-tab-size:2;tab-size:2;-webkit-font-smoothing:auto;-webkit-text-size-adjust:none;position:relative;border-radius:2px;font-size:.8rem;width:100%}:host ::ng-deep code{margin:0;padding:0;overflow-wrap:break-word;white-space:pre-wrap}:host ::ng-deep .highlight{display:block;overflow-wrap:break-word;line-height:1.5;margin:0}:host ::ng-deep .copy-button{border:none;background:inherit;margin-top:-8px;margin-right:-8px}"]
            }] }
];
/** @nocollapse */
TdHighlightComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: DomSanitizer },
    { type: ChangeDetectorRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9oaWdobGlnaHQvIiwic291cmNlcyI6WyJoaWdobGlnaHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxpQkFBaUIsR0FHbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0lBS25ELElBQUksR0FBUSxPQUFPLENBQUMsa0JBQWtCLENBQUM7QUFPM0MsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7OztJQW1FL0IsWUFDVSxTQUFvQixFQUNwQixXQUF1QixFQUN2QixhQUEyQixFQUMzQixHQUFzQjtRQUh0QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBdEV4QixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUc5QixVQUFLLEdBQVcsWUFBWSxDQUFDOzs7Ozs7UUF1QjVCLHdCQUFtQixHQUFZLEtBQUssQ0FBQzs7Ozs7O1FBT3JDLHFCQUFnQixHQUFzQixFQUFFLENBQUM7Ozs7O1FBMkJ4QyxpQkFBWSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO0lBV25FLENBQUM7Ozs7Ozs7Ozs7O0lBMURKLElBQ0ksT0FBTyxDQUFDLE9BQWU7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7SUF3QkQsSUFDSSxJQUFJLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7OztJQXFCRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxtQkFBYSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBQSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDaEY7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQzs7Ozs7OztJQUtPLFlBQVksQ0FBQyxJQUFZO1FBQy9CLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2xDLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUUsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDekY7U0FDRjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7O0lBRU8sa0JBQWtCLENBQUMsT0FBZTs7OztjQUdsQyxVQUFVLEdBQW1CLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQzs7Y0FDakUsV0FBVyxHQUFnQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDckUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELDJDQUEyQztRQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEQsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25GLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7OztJQUVPLE9BQU8sQ0FBQyxRQUFnQjtRQUM5QixxQ0FBcUM7UUFDckMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLENBQUMsQ0FBQzs7O1lBRWxGLEtBQUssR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7O2NBR3BDLG1CQUFtQixHQUFXLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Y0FHNUQsdUJBQXVCLEdBQVcsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLG1CQUFtQixDQUFDO1FBQzdFLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRzs7OztRQUFDLFVBQVUsSUFBWTtZQUN0QyxPQUFPLElBQUk7aUJBQ1IsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7aUJBQ3pDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLENBQUM7aUJBQ3BDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQywrQkFBK0I7UUFDekQsQ0FBQyxFQUFDLENBQUM7O2NBRUcsV0FBVyxHQUFXLEtBQUs7YUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNWLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO2FBQ3hCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO2FBQ3hCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO2FBQ3RCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDOzs7Y0FFekIsZUFBZSxHQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDO1FBQzFFLGVBQWUsQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLEtBQUs7YUFDMUMsT0FBTyxDQUFDLHdDQUF3QyxFQUFFLEVBQUUsQ0FBQzthQUNyRCxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQzthQUNyQixPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFCLE9BQU8sZUFBZSxDQUFDLEtBQUssQ0FBQztJQUMvQixDQUFDOzs7WUF6SkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUV4QixxV0FBeUM7O2FBQzFDOzs7O1lBbkJDLFNBQVM7WUFKVCxVQUFVO1lBV0gsWUFBWTtZQUpuQixpQkFBaUI7OztzQkErQmhCLEtBQUssU0FBQyxTQUFTO2tDQWFmLEtBQUs7K0JBT0wsS0FBSzttQkFVTCxLQUFLLFNBQUMsTUFBTTsyQkFpQlosTUFBTTs0QkFDTixTQUFTLFNBQUMsb0JBQW9CO3VCQUM5QixTQUFTLFNBQUMsZUFBZTtzQkFFekIsU0FBUyxTQUFDLFNBQVM7Ozs7Ozs7SUFoRXBCLDRDQUFzQzs7Ozs7SUFFdEMsd0NBQXlCOzs7OztJQUN6QixxQ0FBcUM7Ozs7Ozs7SUF1QnJDLG1EQUE4Qzs7Ozs7OztJQU85QyxnREFBa0Q7O0lBcUJsRCwyQ0FBb0I7Ozs7OztJQU1wQiw0Q0FBc0U7O0lBQ3RFLDZDQUEyRDs7SUFDM0Qsd0NBQWlEOztJQUVqRCx1Q0FBMEM7Ozs7O0lBR3hDLHlDQUE0Qjs7Ozs7SUFDNUIsMkNBQStCOzs7OztJQUMvQiw2Q0FBbUM7Ozs7O0lBQ25DLG1DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBSZW5kZXJlcjIsXG4gIFNlY3VyaXR5Q29udGV4dCxcbiAgVmlld0NoaWxkLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBNYXRUb29sdGlwIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBJQ29weUNvZGVUb29sdGlwcyB9IGZyb20gJy4nO1xuXG5kZWNsYXJlIGNvbnN0IHJlcXVpcmU6IGFueTtcbi8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xubGV0IGhsanM6IGFueSA9IHJlcXVpcmUoJ2hpZ2hsaWdodC5qcy9saWInKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGQtaGlnaGxpZ2h0JyxcbiAgc3R5bGVVcmxzOiBbJy4vaGlnaGxpZ2h0LmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnLi9oaWdobGlnaHQuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBUZEhpZ2hsaWdodENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQge1xuICBwcml2YXRlIF9pbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2NvbnRlbnQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfbGFuZzogc3RyaW5nID0gJ3R5cGVzY3JpcHQnO1xuXG4gIC8qKlxuICAgKiBjb250ZW50Pzogc3RyaW5nXG4gICAqXG4gICAqIENvZGUgY29udGVudCB0byBiZSBwYXJzZWQgYXMgaGlnaGxpZ2h0ZWQgaHRtbC5cbiAgICogVXNlZCB0byBsb2FkIGRhdGEgZHluYW1pY2FsbHkuXG4gICAqXG4gICAqIGUuZy4gYC5odG1sYCwgYC50c2AgLCBldGMuXG4gICAqL1xuICBASW5wdXQoJ2NvbnRlbnQnKVxuICBzZXQgY29udGVudChjb250ZW50OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jb250ZW50ID0gY29udGVudDtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2xvYWRDb250ZW50KHRoaXMuX2NvbnRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjb3B5Q29kZVRvQ2xpcGJvYXJkPzogYm9vbGVhblxuICAgKlxuICAgKiBEaXNwbGF5IGNvcHkgYnV0dG9uIG9uIGNvZGUgc25pcHBldHMgdG8gY29weSBjb2RlIHRvIGNsaXBib2FyZC5cbiAgICovXG4gIEBJbnB1dCgpIGNvcHlDb2RlVG9DbGlwYm9hcmQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogY29weUNvZGVUb29sdGlwcz86IElDb3B5Q29kZVRvb2x0aXBzXG4gICAqXG4gICAqIFRvb2x0aXBzIGZvciBjb3B5IGJ1dHRvbiB0byBjb3B5IGFuZCB1cG9uIGNvcHlpbmcuXG4gICAqL1xuICBASW5wdXQoKSBjb3B5Q29kZVRvb2x0aXBzOiBJQ29weUNvZGVUb29sdGlwcyA9IHt9O1xuXG4gIC8qKlxuICAgKiBsYW5nPzogc3RyaW5nXG4gICAqXG4gICAqIExhbmd1YWdlIG9mIHRoZSBjb2RlIGNvbnRlbnQgdG8gYmUgcGFyc2VkIGFzIGhpZ2hsaWdodGVkIGh0bWwuXG4gICAqIERlZmF1bHRzIHRvIGB0eXBlc2NyaXB0YFxuICAgKlxuICAgKiBlLmcuIGB0eXBlc2NyaXB0YCwgYGh0bWxgICwgZXRjLlxuICAgKi9cbiAgQElucHV0KCdsYW5nJylcbiAgc2V0IGxhbmcobGFuZzogc3RyaW5nKSB7XG4gICAgaWYgKCFsYW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yOiBsYW5ndWFnZSBhdHRyaWJ1dGUgbXVzdCBiZSBkZWZpbmVkIGluIFRkSGlnaGxpZ2h0Q29tcG9uZW50LicpO1xuICAgIH1cbiAgICB0aGlzLl9sYW5nID0gbGFuZztcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2xvYWRDb250ZW50KHRoaXMuX2NvbnRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGNvcHlDb250ZW50OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIGNvbnRlbnRSZWFkeT86IGZ1bmN0aW9uXG4gICAqIEV2ZW50IGVtaXR0ZWQgYWZ0ZXIgdGhlIGhpZ2hsaWdodCBjb250ZW50IHJlbmRlcmluZyBpcyBmaW5pc2hlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBjb250ZW50UmVhZHk6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQFZpZXdDaGlsZCgnaGlnaGxpZ2h0Q29tcG9uZW50JykgaGlnaGxpZ2h0Q29tcDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnY29weUNvbXBvbmVudCcpIGNvcHlDb21wOiBFbGVtZW50UmVmO1xuXG4gIEBWaWV3Q2hpbGQoJ3Rvb2x0aXAnKSB0b29sdGlwOiBNYXRUb29sdGlwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge31cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fY29udGVudCkge1xuICAgICAgdGhpcy5fbG9hZENvbnRlbnQoKDxIVE1MRWxlbWVudD50aGlzLmhpZ2hsaWdodENvbXAubmF0aXZlRWxlbWVudCkudGV4dENvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sb2FkQ29udGVudCh0aGlzLl9jb250ZW50KTtcbiAgICB9XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYWwgbWV0aG9kIHRvIHBhcnNlIGEgc3RyaW5nIG9mIGNvZGUgaW50byBIVE1MIEVsZW1lbnRzIGFuZCBsb2FkIHRoZW0gaW50byB0aGUgY29udGFpbmVyXG4gICAqL1xuICBwcml2YXRlIF9sb2FkQ29udGVudChjb2RlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoY29kZSAmJiBjb2RlLnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBDbGVhbiBjb250YWluZXJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsICcnKTtcbiAgICAgIC8vIFBhcnNlIGh0bWwgc3RyaW5nIGludG8gYWN0dWFsIEhUTUwgZWxlbWVudHMuXG4gICAgICB0aGlzLl9lbGVtZW50RnJvbVN0cmluZyh0aGlzLl9yZW5kZXIoY29kZSkpO1xuICAgICAgaWYgKHRoaXMuY29weUNvZGVUb0NsaXBib2FyZCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuY29weUNvbXAubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29udGVudFJlYWR5LmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2VsZW1lbnRGcm9tU3RyaW5nKGNvZGVTdHI6IHN0cmluZyk6IEhUTUxQcmVFbGVtZW50IHtcbiAgICAvLyBSZW5kZXJlcjIgZG9lc250IGhhdmUgYSBwYXJzaW5nIG1ldGhvZCwgc28gd2UgaGF2ZSB0byBzYW5pdGl6ZSBhbmQgdXNlIFtpbm5lckhUTUxdXG4gICAgLy8gdG8gcGFyc2UgdGhlIHN0cmluZyBpbnRvIERPTSBlbGVtZW50IGZvciBub3cuXG4gICAgY29uc3QgcHJlRWxlbWVudDogSFRNTFByZUVsZW1lbnQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdwcmUnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHByZUVsZW1lbnQpO1xuICAgIGNvbnN0IGNvZGVFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2NvZGUnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChwcmVFbGVtZW50LCBjb2RlRWxlbWVudCk7XG4gICAgLy8gU2V0IC5oaWdobGlnaHQgY2xhc3MgaW50byA8Y29kZT4gZWxlbWVudFxuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGNvZGVFbGVtZW50LCAnaGlnaGxpZ2h0Jyk7XG4gICAgY29kZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fZG9tU2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5IVE1MLCBjb2RlU3RyKTtcbiAgICByZXR1cm4gcHJlRWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbmRlcihjb250ZW50czogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBUcmltIGxlYWRpbmcgYW5kIHRyYWlsaW5nIG5ld2xpbmVzXG4gICAgY29udGVudHMgPSBjb250ZW50cy5yZXBsYWNlKC9eKFxcc3xcXHQpKlxcbisvZywgJycpLnJlcGxhY2UoLyhcXHN8XFx0KSpcXG4rKFxcc3xcXHQpKiQvZywgJycpO1xuICAgIC8vIFNwbGl0IG1hcmt1cCBieSBsaW5lIGNoYXJhY3RlcnNcbiAgICBsZXQgbGluZXM6IHN0cmluZ1tdID0gY29udGVudHMuc3BsaXQoJ1xcbicpO1xuXG4gICAgLy8gY2hlY2sgaG93IG11Y2ggaW5kZW50YXRpb24gaXMgdXNlZCBieSB0aGUgZmlyc3QgYWN0dWFsIGNvZGUgbGluZVxuICAgIGNvbnN0IGZpcnN0TGluZVdoaXRlc3BhY2U6IHN0cmluZyA9IGxpbmVzWzBdLm1hdGNoKC9eKFxcc3xcXHQpKi8pWzBdO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCBpbmRlbnRhdGlvbiBzcGFjZXMgc28gY29kZSBjYW4gYmUgcGFyc2VkIGNvcnJlY3RseVxuICAgIGNvbnN0IHN0YXJ0aW5nV2hpdGVzcGFjZVJlZ2V4OiBSZWdFeHAgPSBuZXcgUmVnRXhwKCdeJyArIGZpcnN0TGluZVdoaXRlc3BhY2UpO1xuICAgIGxpbmVzID0gbGluZXMubWFwKGZ1bmN0aW9uIChsaW5lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIGxpbmVcbiAgICAgICAgLnJlcGxhY2UoJz1cIlwiJywgJycpIC8vIHJlbW92ZSBlbXB0eSB2YWx1ZXNcbiAgICAgICAgLnJlcGxhY2Uoc3RhcnRpbmdXaGl0ZXNwYWNlUmVnZXgsICcnKVxuICAgICAgICAucmVwbGFjZSgvXFxzKyQvLCAnJyk7IC8vIHJlbW92ZSB0cmFpbGluZyB3aGl0ZSBzcGFjZXNcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvZGVUb1BhcnNlOiBzdHJpbmcgPSBsaW5lc1xuICAgICAgLmpvaW4oJ1xcbicpXG4gICAgICAucmVwbGFjZSgvXFx7IFxcey9naSwgJ3t7JylcbiAgICAgIC5yZXBsYWNlKC9cXH0gXFx9L2dpLCAnfX0nKVxuICAgICAgLnJlcGxhY2UoLyZsdDsvZ2ksICc8JylcbiAgICAgIC5yZXBsYWNlKC8mZ3Q7L2dpLCAnPicpOyAvLyByZXBsYWNlIHdpdGggPCBhbmQgPiB0byByZW5kZXIgSFRNTCBpbiBBbmd1bGFyXG4gICAgdGhpcy5jb3B5Q29udGVudCA9IGNvZGVUb1BhcnNlO1xuICAgIC8vIFBhcnNlIGNvZGUgd2l0aCBoaWdobGlnaHQuanMgZGVwZW5kaW5nIG9uIGxhbmd1YWdlXG4gICAgY29uc3QgaGlnaGxpZ2h0ZWRDb2RlOiBhbnkgPSBobGpzLmhpZ2hsaWdodCh0aGlzLl9sYW5nLCBjb2RlVG9QYXJzZSwgdHJ1ZSk7XG4gICAgaGlnaGxpZ2h0ZWRDb2RlLnZhbHVlID0gaGlnaGxpZ2h0ZWRDb2RlLnZhbHVlXG4gICAgICAucmVwbGFjZSgvPTxzcGFuIGNsYXNzPVwiaGxqcy12YWx1ZVwiPlwiXCI8XFwvc3Bhbj4vZ2ksICcnKVxuICAgICAgLnJlcGxhY2UoJzxoZWFkPicsICcnKVxuICAgICAgLnJlcGxhY2UoJzxoZWFkLz4nLCAnJyk7XG4gICAgcmV0dXJuIGhpZ2hsaWdodGVkQ29kZS52YWx1ZTtcbiAgfVxufVxuIl19
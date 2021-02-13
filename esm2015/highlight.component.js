/**
 * @fileoverview added by tsickle
 * Generated from: highlight.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    set codeLang(lang) {
        this.setLanguage(lang);
    }
    /**
     * @deprecated - removed completely \@4.0.0
     * @param {?} lang
     * @return {?}
     */
    set lang(lang) {
        // tslint:disable-next-line: no-console
        console.warn('DEPRECATION WARNING: switch to codeLang attribute as lang attribute is deprecated.');
        this.setLanguage(lang);
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
     * @param {?} lang
     * @return {?}
     */
    setLanguage(lang) {
        if (!lang) {
            throw new Error('Error: language attribute must be defined in TdHighlightComponent.');
        }
        this._lang = lang;
        if (this._initialized) {
            this._loadContent(this._content);
        }
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
                styles: [":host ::ng-deep{display:-ms-flexbox;display:flex;overflow-x:auto;padding:16px}:host ::ng-deep .highlight,:host ::ng-deep code,:host ::ng-deep pre{font-family:Menlo,Monaco,Andale Mono,lucida console,Courier New,monospace}:host ::ng-deep pre{-moz-tab-size:2;-o-tab-size:2;-webkit-font-smoothing:auto;-webkit-text-size-adjust:none;background:rgba(0,0,0,0);border-radius:2px;display:block;font-family:Menlo,Monaco,Andale Mono,lucida console,Courier New,monospace;font-size:.8rem;line-height:1.45;margin:0;overflow-x:auto;padding:0;position:relative;tab-size:2;width:100%}:host ::ng-deep code{margin:0;overflow-wrap:break-word;padding:0;white-space:pre-wrap}:host ::ng-deep .highlight{display:block;line-height:1.5;margin:0;overflow-wrap:break-word}:host ::ng-deep .copy-button{background:inherit;border:none;margin-right:-8px;margin-top:-8px}"]
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
    codeLang: [{ type: Input, args: ['codeLang',] }],
    lang: [{ type: Input }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9zcmMvcGxhdGZvcm0vaGlnaGxpZ2h0LyIsInNvdXJjZXMiOlsiaGlnaGxpZ2h0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULGlCQUFpQixHQUdsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7SUFLbkQsSUFBSSxHQUFRLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztBQU8zQyxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7O0lBcUUvQixZQUNVLFNBQW9CLEVBQ3BCLFdBQXVCLEVBQ3ZCLGFBQTJCLEVBQzNCLEdBQXNCO1FBSHRCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF4RXhCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRzlCLFVBQUssR0FBVyxZQUFZLENBQUM7Ozs7OztRQXVCNUIsd0JBQW1CLEdBQVksS0FBSyxDQUFDOzs7Ozs7UUFPckMscUJBQWdCLEdBQXNCLEVBQUUsQ0FBQzs7Ozs7UUE2QnhDLGlCQUFZLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7SUFXbkUsQ0FBQzs7Ozs7Ozs7Ozs7SUE1REosSUFDSSxPQUFPLENBQUMsT0FBZTtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVks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QUFFLEVBQUUsQ0FBQzthQUNyRCxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQzthQUNyQixPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFCLE9BQU8sZUFBZSxDQUFDLEtBQUssQ0FBQztJQUMvQixDQUFDOzs7WUFyS0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUV4QixxV0FBeUM7O2FBQzFDOzs7O1lBbkJDLFNBQVM7WUFKVCxVQUFVO1lBV0gsWUFBWTtZQUpuQixpQkFBaUI7OztzQkErQmhCLEtBQUssU0FBQyxTQUFTO2tDQWFmLEtBQUs7K0JBT0wsS0FBSzt1QkFXTCxLQUFLLFNBQUMsVUFBVTttQkFLaEIsS0FBSzsyQkFhTCxNQUFNOzRCQUNOLFNBQVMsU0FBQyxvQkFBb0I7dUJBQzlCLFNBQVMsU0FBQyxlQUFlO3NCQUV6QixTQUFTLFNBQUMsU0FBUzs7Ozs7OztJQWxFcEIsNENBQXNDOzs7OztJQUV0Qyx3Q0FBeUI7Ozs7O0lBQ3pCLHFDQUFxQzs7Ozs7OztJQXVCckMsbURBQThDOzs7Ozs7O0lBTzlDLGdEQUFrRDs7SUF1QmxELDJDQUFvQjs7Ozs7O0lBTXBCLDRDQUFzRTs7SUFDdEUsNkNBQTJEOztJQUMzRCx3Q0FBaUQ7O0lBRWpELHVDQUEwQzs7Ozs7SUFHeEMseUNBQTRCOzs7OztJQUM1QiwyQ0FBK0I7Ozs7O0lBQy9CLDZDQUFtQzs7Ozs7SUFDbkMsbUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBBZnRlclZpZXdJbml0LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFJlbmRlcmVyMixcbiAgU2VjdXJpdHlDb250ZXh0LFxuICBWaWV3Q2hpbGQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBBZnRlclZpZXdDaGVja2VkLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE1hdFRvb2x0aXAgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IElDb3B5Q29kZVRvb2x0aXBzIH0gZnJvbSAnLic7XG5cbmRlY2xhcmUgY29uc3QgcmVxdWlyZTogYW55O1xuLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXG5sZXQgaGxqczogYW55ID0gcmVxdWlyZSgnaGlnaGxpZ2h0LmpzL2xpYicpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ZC1oaWdobGlnaHQnLFxuICBzdHlsZVVybHM6IFsnLi9oaWdobGlnaHQuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2hpZ2hsaWdodC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFRkSGlnaGxpZ2h0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG4gIHByaXZhdGUgX2luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfY29udGVudDogc3RyaW5nO1xuICBwcml2YXRlIF9sYW5nOiBzdHJpbmcgPSAndHlwZXNjcmlwdCc7XG5cbiAgLyoqXG4gICAqIGNvbnRlbnQ/OiBzdHJpbmdcbiAgICpcbiAgICogQ29kZSBjb250ZW50IHRvIGJlIHBhcnNlZCBhcyBoaWdobGlnaHRlZCBodG1sLlxuICAgKiBVc2VkIHRvIGxvYWQgZGF0YSBkeW5hbWljYWxseS5cbiAgICpcbiAgICogZS5nLiBgLmh0bWxgLCBgLnRzYCAsIGV0Yy5cbiAgICovXG4gIEBJbnB1dCgnY29udGVudCcpXG4gIHNldCBjb250ZW50KGNvbnRlbnQ6IHN0cmluZykge1xuICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fbG9hZENvbnRlbnQodGhpcy5fY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNvcHlDb2RlVG9DbGlwYm9hcmQ/OiBib29sZWFuXG4gICAqXG4gICAqIERpc3BsYXkgY29weSBidXR0b24gb24gY29kZSBzbmlwcGV0cyB0byBjb3B5IGNvZGUgdG8gY2xpcGJvYXJkLlxuICAgKi9cbiAgQElucHV0KCkgY29weUNvZGVUb0NsaXBib2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBjb3B5Q29kZVRvb2x0aXBzPzogSUNvcHlDb2RlVG9vbHRpcHNcbiAgICpcbiAgICogVG9vbHRpcHMgZm9yIGNvcHkgYnV0dG9uIHRvIGNvcHkgYW5kIHVwb24gY29weWluZy5cbiAgICovXG4gIEBJbnB1dCgpIGNvcHlDb2RlVG9vbHRpcHM6IElDb3B5Q29kZVRvb2x0aXBzID0ge307XG5cbiAgLyoqXG4gICAqIGxhbmc/OiBzdHJpbmdcbiAgICpcbiAgICogTGFuZ3VhZ2Ugb2YgdGhlIGNvZGUgY29udGVudCB0byBiZSBwYXJzZWQgYXMgaGlnaGxpZ2h0ZWQgaHRtbC5cbiAgICogRGVmYXVsdHMgdG8gYHR5cGVzY3JpcHRgXG4gICAqXG4gICAqIGUuZy4gYHR5cGVzY3JpcHRgLCBgaHRtbGAgLCBldGMuXG4gICAqL1xuXG4gIEBJbnB1dCgnY29kZUxhbmcnKVxuICBzZXQgY29kZUxhbmcobGFuZzogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRMYW5ndWFnZShsYW5nKTtcbiAgfVxuICAvKiogQGRlcHJlY2F0ZWQgLSByZW1vdmVkIGNvbXBsZXRlbHkgQDQuMC4wICovXG4gIEBJbnB1dCgpXG4gIHNldCBsYW5nKGxhbmc6IHN0cmluZykge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tY29uc29sZVxuICAgIGNvbnNvbGUud2FybignREVQUkVDQVRJT04gV0FSTklORzogc3dpdGNoIHRvIGNvZGVMYW5nIGF0dHJpYnV0ZSBhcyBsYW5nIGF0dHJpYnV0ZSBpcyBkZXByZWNhdGVkLicpO1xuICAgIHRoaXMuc2V0TGFuZ3VhZ2UobGFuZyk7XG4gIH1cblxuICBjb3B5Q29udGVudDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBjb250ZW50UmVhZHk/OiBmdW5jdGlvblxuICAgKiBFdmVudCBlbWl0dGVkIGFmdGVyIHRoZSBoaWdobGlnaHQgY29udGVudCByZW5kZXJpbmcgaXMgZmluaXNoZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgY29udGVudFJlYWR5OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBWaWV3Q2hpbGQoJ2hpZ2hsaWdodENvbXBvbmVudCcpIGhpZ2hsaWdodENvbXA6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NvcHlDb21wb25lbnQnKSBjb3B5Q29tcDogRWxlbWVudFJlZjtcblxuICBAVmlld0NoaWxkKCd0b29sdGlwJykgdG9vbHRpcDogTWF0VG9vbHRpcDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRlbnQpIHtcbiAgICAgIHRoaXMuX2xvYWRDb250ZW50KCg8SFRNTEVsZW1lbnQ+dGhpcy5oaWdobGlnaHRDb21wLm5hdGl2ZUVsZW1lbnQpLnRleHRDb250ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbG9hZENvbnRlbnQodGhpcy5fY29udGVudCk7XG4gICAgfVxuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIHNldExhbmd1YWdlKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghbGFuZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvcjogbGFuZ3VhZ2UgYXR0cmlidXRlIG11c3QgYmUgZGVmaW5lZCBpbiBUZEhpZ2hsaWdodENvbXBvbmVudC4nKTtcbiAgICB9XG4gICAgdGhpcy5fbGFuZyA9IGxhbmc7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9sb2FkQ29udGVudCh0aGlzLl9jb250ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhbCBtZXRob2QgdG8gcGFyc2UgYSBzdHJpbmcgb2YgY29kZSBpbnRvIEhUTUwgRWxlbWVudHMgYW5kIGxvYWQgdGhlbSBpbnRvIHRoZSBjb250YWluZXJcbiAgICovXG4gIHByaXZhdGUgX2xvYWRDb250ZW50KGNvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChjb2RlICYmIGNvZGUudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIENsZWFuIGNvbnRhaW5lclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgJycpO1xuICAgICAgLy8gUGFyc2UgaHRtbCBzdHJpbmcgaW50byBhY3R1YWwgSFRNTCBlbGVtZW50cy5cbiAgICAgIHRoaXMuX2VsZW1lbnRGcm9tU3RyaW5nKHRoaXMuX3JlbmRlcihjb2RlKSk7XG4gICAgICBpZiAodGhpcy5jb3B5Q29kZVRvQ2xpcGJvYXJkKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5jb3B5Q29tcC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb250ZW50UmVhZHkuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZWxlbWVudEZyb21TdHJpbmcoY29kZVN0cjogc3RyaW5nKTogSFRNTFByZUVsZW1lbnQge1xuICAgIC8vIFJlbmRlcmVyMiBkb2VzbnQgaGF2ZSBhIHBhcnNpbmcgbWV0aG9kLCBzbyB3ZSBoYXZlIHRvIHNhbml0aXplIGFuZCB1c2UgW2lubmVySFRNTF1cbiAgICAvLyB0byBwYXJzZSB0aGUgc3RyaW5nIGludG8gRE9NIGVsZW1lbnQgZm9yIG5vdy5cbiAgICBjb25zdCBwcmVFbGVtZW50OiBIVE1MUHJlRWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgcHJlRWxlbWVudCk7XG4gICAgY29uc3QgY29kZUVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnY29kZScpO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHByZUVsZW1lbnQsIGNvZGVFbGVtZW50KTtcbiAgICAvLyBTZXQgLmhpZ2hsaWdodCBjbGFzcyBpbnRvIDxjb2RlPiBlbGVtZW50XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoY29kZUVsZW1lbnQsICdoaWdobGlnaHQnKTtcbiAgICBjb2RlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9kb21TYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LkhUTUwsIGNvZGVTdHIpO1xuICAgIHJldHVybiBwcmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVuZGVyKGNvbnRlbnRzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIFRyaW0gbGVhZGluZyBhbmQgdHJhaWxpbmcgbmV3bGluZXNcbiAgICBjb250ZW50cyA9IGNvbnRlbnRzLnJlcGxhY2UoL14oXFxzfFxcdCkqXFxuKy9nLCAnJykucmVwbGFjZSgvKFxcc3xcXHQpKlxcbisoXFxzfFxcdCkqJC9nLCAnJyk7XG4gICAgLy8gU3BsaXQgbWFya3VwIGJ5IGxpbmUgY2hhcmFjdGVyc1xuICAgIGxldCBsaW5lczogc3RyaW5nW10gPSBjb250ZW50cy5zcGxpdCgnXFxuJyk7XG5cbiAgICAvLyBjaGVjayBob3cgbXVjaCBpbmRlbnRhdGlvbiBpcyB1c2VkIGJ5IHRoZSBmaXJzdCBhY3R1YWwgY29kZSBsaW5lXG4gICAgY29uc3QgZmlyc3RMaW5lV2hpdGVzcGFjZTogc3RyaW5nID0gbGluZXNbMF0ubWF0Y2goL14oXFxzfFxcdCkqLylbMF07XG5cbiAgICAvLyBSZW1vdmUgYWxsIGluZGVudGF0aW9uIHNwYWNlcyBzbyBjb2RlIGNhbiBiZSBwYXJzZWQgY29ycmVjdGx5XG4gICAgY29uc3Qgc3RhcnRpbmdXaGl0ZXNwYWNlUmVnZXg6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14nICsgZmlyc3RMaW5lV2hpdGVzcGFjZSk7XG4gICAgbGluZXMgPSBsaW5lcy5tYXAoZnVuY3Rpb24gKGxpbmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gbGluZVxuICAgICAgICAucmVwbGFjZSgnPVwiXCInLCAnJykgLy8gcmVtb3ZlIGVtcHR5IHZhbHVlc1xuICAgICAgICAucmVwbGFjZShzdGFydGluZ1doaXRlc3BhY2VSZWdleCwgJycpXG4gICAgICAgIC5yZXBsYWNlKC9cXHMrJC8sICcnKTsgLy8gcmVtb3ZlIHRyYWlsaW5nIHdoaXRlIHNwYWNlc1xuICAgIH0pO1xuXG4gICAgY29uc3QgY29kZVRvUGFyc2U6IHN0cmluZyA9IGxpbmVzXG4gICAgICAuam9pbignXFxuJylcbiAgICAgIC5yZXBsYWNlKC9cXHsgXFx7L2dpLCAne3snKVxuICAgICAgLnJlcGxhY2UoL1xcfSBcXH0vZ2ksICd9fScpXG4gICAgICAucmVwbGFjZSgvJmx0Oy9naSwgJzwnKVxuICAgICAgLnJlcGxhY2UoLyZndDsvZ2ksICc+Jyk7IC8vIHJlcGxhY2Ugd2l0aCA8IGFuZCA+IHRvIHJlbmRlciBIVE1MIGluIEFuZ3VsYXJcbiAgICB0aGlzLmNvcHlDb250ZW50ID0gY29kZVRvUGFyc2U7XG4gICAgLy8gUGFyc2UgY29kZSB3aXRoIGhpZ2hsaWdodC5qcyBkZXBlbmRpbmcgb24gbGFuZ3VhZ2VcbiAgICBjb25zdCBoaWdobGlnaHRlZENvZGU6IGFueSA9IGhsanMuaGlnaGxpZ2h0KHRoaXMuX2xhbmcsIGNvZGVUb1BhcnNlLCB0cnVlKTtcbiAgICBoaWdobGlnaHRlZENvZGUudmFsdWUgPSBoaWdobGlnaHRlZENvZGUudmFsdWVcbiAgICAgIC5yZXBsYWNlKC89PHNwYW4gY2xhc3M9XCJobGpzLXZhbHVlXCI+XCJcIjxcXC9zcGFuPi9naSwgJycpXG4gICAgICAucmVwbGFjZSgnPGhlYWQ+JywgJycpXG4gICAgICAucmVwbGFjZSgnPGhlYWQvPicsICcnKTtcbiAgICByZXR1cm4gaGlnaGxpZ2h0ZWRDb2RlLnZhbHVlO1xuICB9XG59XG4iXX0=
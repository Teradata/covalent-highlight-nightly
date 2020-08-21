import lib from 'highlight.js/lib';
import { EventEmitter, SecurityContext, Component, Renderer2, ElementRef, ChangeDetectorRef, Input, Output, ViewChild, HostListener, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/* tslint:disable-next-line */
/** @type {?} */

class TdHighlightComponent {
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
        const highlightedCode = lib.highlight(this._lang, codeToParse, true);
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
                styles: [":host ::ng-deep{overflow-x:auto;padding:16px}:host ::ng-deep .highlight,:host ::ng-deep code,:host ::ng-deep pre{font-family:Menlo,Monaco,\"Andale Mono\",\"lucida console\",\"Courier New\",monospace}:host ::ng-deep pre{display:block;overflow-x:auto;padding:0;margin:0;background:0 0;font-family:Menlo,Monaco,\"Andale Mono\",\"lucida console\",\"Courier New\",monospace;line-height:1.45;-moz-tab-size:2;-o-tab-size:2;tab-size:2;-webkit-font-smoothing:auto;-webkit-text-size-adjust:none;position:relative;border-radius:2px;font-size:.8rem;width:100%}:host ::ng-deep code{margin:0;padding:0;overflow-wrap:break-word;white-space:pre-wrap}:host ::ng-deep .highlight{display:block;overflow-wrap:break-word;line-height:1.5;margin:0}:host ::ng-deep .copy-button{border:none;background:inherit;margin-top:-8px;margin-right:-8px}"]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ICopyCodeTooltips() { }
if (false) {
    /** @type {?|undefined} */
    ICopyCodeTooltips.prototype.copy;
    /** @type {?|undefined} */
    ICopyCodeTooltips.prototype.copied;
}
class TdCopyCodeButtonComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CovalentHighlightModule {
}
CovalentHighlightModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClipboardModule, MatIconModule, MatTooltipModule, MatButtonModule],
                declarations: [TdHighlightComponent, TdCopyCodeButtonComponent],
                exports: [TdHighlightComponent],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CovalentHighlightModule, TdCopyCodeButtonComponent, TdHighlightComponent };
//# sourceMappingURL=covalent-highlight.js.map

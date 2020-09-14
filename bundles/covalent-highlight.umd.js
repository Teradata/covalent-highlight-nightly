(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('highlight.js/lib'), require('@angular/core'), require('@angular/platform-browser'), require('@angular/material/tooltip'), require('@angular/common'), require('@angular/cdk/clipboard'), require('@angular/material/icon'), require('@angular/material/button')) :
    typeof define === 'function' && define.amd ? define('@covalent/highlight', ['exports', 'highlight.js/lib', '@angular/core', '@angular/platform-browser', '@angular/material/tooltip', '@angular/common', '@angular/cdk/clipboard', '@angular/material/icon', '@angular/material/button'], factory) :
    (global = global || self, factory((global.covalent = global.covalent || {}, global.covalent.highlight = {}), global.lib, global.ng.core, global.ng.platformBrowser, global.ng.material.tooltip, global.ng.common, global.ng.cdk.clipboard, global.ng.material.icon, global.ng.material.button));
}(this, (function (exports, lib, core, platformBrowser, tooltip, common, clipboard, icon, button) { 'use strict';

    lib = lib && Object.prototype.hasOwnProperty.call(lib, 'default') ? lib['default'] : lib;

    /* tslint:disable-next-line */
    /** @type {?} */

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
            this.contentReady = new core.EventEmitter();
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
            codeElement.innerHTML = this._domSanitizer.sanitize(core.SecurityContext.HTML, codeStr);
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
            var highlightedCode = lib.highlight(this._lang, codeToParse, true);
            highlightedCode.value = highlightedCode.value
                .replace(/=<span class="hljs-value">""<\/span>/gi, '')
                .replace('<head>', '')
                .replace('<head/>', '');
            return highlightedCode.value;
        };
        TdHighlightComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'td-highlight',
                        template: "<div>\n  <div #highlightComponent>\n    <ng-content></ng-content>\n  </div>\n\n  <div #copyComponent *ngIf=\"copyCodeToClipboard\">\n    <td-copy-code-button\n      [copiedContent]=\"copyContent\"\n      [copyCodeToClipboard]=\"copyCodeToClipboard\"\n      [copyCodeTooltips]=\"copyCodeTooltips\"\n    ></td-copy-code-button>\n  </div>\n</div>\n",
                        styles: [":host ::ng-deep{overflow-x:auto;padding:16px;display:-ms-flexbox;display:flex}:host ::ng-deep .highlight,:host ::ng-deep code,:host ::ng-deep pre{font-family:Menlo,Monaco,\"Andale Mono\",\"lucida console\",\"Courier New\",monospace}:host ::ng-deep pre{display:block;overflow-x:auto;padding:0;margin:0;background:0 0;font-family:Menlo,Monaco,\"Andale Mono\",\"lucida console\",\"Courier New\",monospace;line-height:1.45;-moz-tab-size:2;-o-tab-size:2;tab-size:2;-webkit-font-smoothing:auto;-webkit-text-size-adjust:none;position:relative;border-radius:2px;font-size:.8rem;width:100%}:host ::ng-deep code{margin:0;padding:0;overflow-wrap:break-word;white-space:pre-wrap}:host ::ng-deep .highlight{display:block;overflow-wrap:break-word;line-height:1.5;margin:0}:host ::ng-deep .copy-button{border:none;background:inherit;margin-top:-8px;margin-right:-8px}"]
                    }] }
        ];
        /** @nocollapse */
        TdHighlightComponent.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.ElementRef },
            { type: platformBrowser.DomSanitizer },
            { type: core.ChangeDetectorRef }
        ]; };
        TdHighlightComponent.propDecorators = {
            content: [{ type: core.Input, args: ['content',] }],
            copyCodeToClipboard: [{ type: core.Input }],
            copyCodeTooltips: [{ type: core.Input }],
            lang: [{ type: core.Input, args: ['lang',] }],
            contentReady: [{ type: core.Output }],
            highlightComp: [{ type: core.ViewChild, args: ['highlightComponent',] }],
            copyComp: [{ type: core.ViewChild, args: ['copyComponent',] }],
            tooltip: [{ type: core.ViewChild, args: ['tooltip',] }]
        };
        return TdHighlightComponent;
    }());
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
                return (this.copyCodeTooltips && this.copyCodeTooltips.copy) || 'Copy';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdCopyCodeButtonComponent.prototype, "copiedTooltip", {
            get: /**
             * @return {?}
             */
            function () {
                return (this.copyCodeTooltips && this.copyCodeTooltips.copied) || 'Copied';
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
            { type: core.Component, args: [{
                        selector: 'td-copy-code-button',
                        template: "<button\n  mat-icon-button\n  [cdkCopyToClipboard]=\"copiedContent\"\n  class=\"copy-button\"\n  [matTooltip]=\"copyTooltip\"\n  #tooltip=\"matTooltip\"\n  (cdkCopyToClipboardCopied)=\"textCopied($event)\"\n>\n  <mat-icon role=\"img\">content_copy</mat-icon>\n</button>\n",
                        styles: [""]
                    }] }
        ];
        TdCopyCodeButtonComponent.propDecorators = {
            copiedContent: [{ type: core.Input }],
            copyCodeToClipboard: [{ type: core.Input }],
            copyCodeTooltips: [{ type: core.Input }],
            tooltip: [{ type: core.ViewChild, args: ['tooltip',] }],
            initializeTooltip: [{ type: core.HostListener, args: ['mouseleave',] }]
        };
        return TdCopyCodeButtonComponent;
    }());
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
    var CovalentHighlightModule = /** @class */ (function () {
        function CovalentHighlightModule() {
        }
        CovalentHighlightModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, clipboard.ClipboardModule, icon.MatIconModule, tooltip.MatTooltipModule, button.MatButtonModule],
                        declarations: [TdHighlightComponent, TdCopyCodeButtonComponent],
                        exports: [TdHighlightComponent],
                    },] }
        ];
        return CovalentHighlightModule;
    }());

    exports.CovalentHighlightModule = CovalentHighlightModule;
    exports.TdCopyCodeButtonComponent = TdCopyCodeButtonComponent;
    exports.TdHighlightComponent = TdHighlightComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=covalent-highlight.umd.js.map

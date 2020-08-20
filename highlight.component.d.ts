import { AfterViewInit, ElementRef, EventEmitter, Renderer2, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTooltip } from '@angular/material/tooltip';
import { ICopyCodeTooltips } from '.';
export declare class TdHighlightComponent implements AfterViewInit, AfterViewChecked {
    private _renderer;
    private _elementRef;
    private _domSanitizer;
    private cdr;
    private _initialized;
    private _content;
    private _lang;
    /**
     * content?: string
     *
     * Code content to be parsed as highlighted html.
     * Used to load data dynamically.
     *
     * e.g. `.html`, `.ts` , etc.
     */
    set content(content: string);
    /**
     * copyCodeToClipboard?: boolean
     *
     * Display copy button on code snippets to copy code to clipboard.
     */
    copyCodeToClipboard: boolean;
    /**
     * copyCodeTooltips?: ICopyCodeTooltips
     *
     * Tooltips for copy button to copy and upon copying.
     */
    copyCodeTooltips: ICopyCodeTooltips;
    /**
     * lang?: string
     *
     * Language of the code content to be parsed as highlighted html.
     * Defaults to `typescript`
     *
     * e.g. `typescript`, `html` , etc.
     */
    set lang(lang: string);
    copyContent: string;
    /**
     * contentReady?: function
     * Event emitted after the highlight content rendering is finished.
     */
    contentReady: EventEmitter<void>;
    highlightComp: ElementRef;
    copyComp: ElementRef;
    tooltip: MatTooltip;
    constructor(_renderer: Renderer2, _elementRef: ElementRef, _domSanitizer: DomSanitizer, cdr: ChangeDetectorRef);
    ngAfterViewChecked(): void;
    ngAfterViewInit(): void;
    /**
     * General method to parse a string of code into HTML Elements and load them into the container
     */
    private _loadContent;
    private _elementFromString;
    private _render;
}

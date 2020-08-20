import { MatTooltip } from '@angular/material/tooltip';
export interface ICopyCodeTooltips {
    copy?: string;
    copied?: string;
}
export declare class TdCopyCodeButtonComponent {
    copiedContent: string;
    copyCodeToClipboard: boolean;
    /**
     * copyCodeTooltips?: ICopyCodeTooltips
     *
     * Tooltips for copy button to copy and upon copying.
     */
    copyCodeTooltips: ICopyCodeTooltips;
    get copyTooltip(): string;
    get copiedTooltip(): string;
    tooltip: MatTooltip;
    textCopied(event: boolean): void;
    initializeTooltip(): void;
}

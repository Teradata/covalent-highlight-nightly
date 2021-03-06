/**
 * @fileoverview added by tsickle
 * Generated from: highlight.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TdHighlightComponent } from './highlight.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TdCopyCodeButtonComponent } from './copy-code-button/copy-code-button.component';
export class CovalentHighlightModule {
}
CovalentHighlightModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClipboardModule, MatIconModule, MatTooltipModule, MatButtonModule],
                declarations: [TdHighlightComponent, TdCopyCodeButtonComponent],
                exports: [TdHighlightComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9zcmMvcGxhdGZvcm0vaGlnaGxpZ2h0LyIsInNvdXJjZXMiOlsiaGlnaGxpZ2h0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBTzFGLE1BQU0sT0FBTyx1QkFBdUI7OztZQUxuQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO2dCQUMxRixZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSx5QkFBeUIsQ0FBQztnQkFDL0QsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7YUFDaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENsaXBib2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jbGlwYm9hcmQnO1xuaW1wb3J0IHsgVGRIaWdobGlnaHRDb21wb25lbnQgfSBmcm9tICcuL2hpZ2hsaWdodC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IFRkQ29weUNvZGVCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2NvcHktY29kZS1idXR0b24vY29weS1jb2RlLWJ1dHRvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDbGlwYm9hcmRNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1RkSGlnaGxpZ2h0Q29tcG9uZW50LCBUZENvcHlDb2RlQnV0dG9uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RkSGlnaGxpZ2h0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ292YWxlbnRIaWdobGlnaHRNb2R1bGUge31cbiJdfQ==
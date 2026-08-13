import {Locator, Page} from '@playwright/test';
import { step } from '../helpers/test-step-decorator';
import { HelperBase } from './helper-base';

export class NavigationPage extends HelperBase {
    
    private readonly formLayoutMenu: Locator;
    private readonly datePickerMenu: Locator;
    private readonly toasterMenu: Locator;
    private readonly tooltipMenu: Locator;
    private readonly smartTableMenu: Locator;

    constructor(page: Page) {
        super(page);
        this.formLayoutMenu = page.getByText('Form Layouts');
        this.datePickerMenu = page.getByText('Datepicker');
        this.toasterMenu = page.getByText('Toastr');
        this.tooltipMenu = page.getByText('Tooltip');
        this.smartTableMenu = page.getByText('Smart Table');
    }

    @step
    async navigateToFormLayoutPage() {
        await this.selectGroupMenuItem('Forms');
        await this.formLayoutMenu.click();
    }

    @step
    async navigateToDatePickerPage() {
        await this.selectGroupMenuItem('Forms');
        await this.page.waitForTimeout(1000); // Wait for 1 second to ensure the menu is fully loaded   
        await this.datePickerMenu.click();
    }

    @step
    async navigateToToasterPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.toasterMenu.click();
    }

    @step
    async navigateToTooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.tooltipMenu.click();
    }
    
    @step
    async navigateToSmartTablePage() {
        await this.selectGroupMenuItem('Tables & Data');
        await this.smartTableMenu.click();
    }

    private async selectGroupMenuItem(groupMenuTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupMenuTitle);
        const expandedState = await groupMenuItem.getAttribute('aria-expanded');
        if (expandedState == "false"){
            await groupMenuItem.click();
        }
    }
}
import { Page } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigation-page';
import { FormLayoutsPage } from '../page-objects/form-layouts-page';
import { DatePickerPage } from '../page-objects/datepicker-page';

export class PageManager {
    readonly navigationPage: NavigationPage;
    readonly formLayoutsPage: FormLayoutsPage;
    readonly datePickerPage: DatePickerPage;

    constructor(page: Page) {
        this.navigationPage = new NavigationPage(page);
        this.formLayoutsPage = new FormLayoutsPage(page);
        this.datePickerPage = new DatePickerPage(page);
    }
}
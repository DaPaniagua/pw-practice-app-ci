import { Page } from '@playwright/test';

export class HelperBase {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getToastrMessage(){
        //this method validates toaster and get its message
        return "I'm cool toaster";
    }
}
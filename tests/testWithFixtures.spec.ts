import {test} from '../test-options';
import {faker} from '@faker-js/faker';

test('Parametrized page object methods', async ({pageManager}) => {
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replaceAll(' ', '')}${faker.number.int(1000)}@example.com`;

    await pageManager.formLayoutsPage.submitUsingTheGridForm(process.env.USERNAME, process.env.PASSWORD, 'Option 2');
    await pageManager.formLayoutsPage.submitInLineForm(randomFullName, randomEmail, true);
});


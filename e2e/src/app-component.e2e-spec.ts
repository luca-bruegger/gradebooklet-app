import { AppComponentPage } from './app-component.po';

describe('app-component test', () => {
  let page: AppComponentPage;

  beforeEach(() => {
    page = new AppComponentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toContain('Subjects');
  });
});

import { LzCmsPage } from './app.po';

describe('lz-cms App', () => {
  let page: LzCmsPage;

  beforeEach(() => {
    page = new LzCmsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

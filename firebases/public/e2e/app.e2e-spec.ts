import { BlogWithFirebasePage } from './app.po';

describe('blog-with-firebase App', function() {
  let page: BlogWithFirebasePage;

  beforeEach(() => {
    page = new BlogWithFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

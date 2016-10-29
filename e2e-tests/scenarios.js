'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('S2it', function() {

  it('should automatically redirect to /master when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/master");
  });

  describe('master', function() {

    beforeEach(function() {
      browser.get('/#!/master');
    });

    it('should render master.html when user navigates to /master', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for master/);
    });

  });
});

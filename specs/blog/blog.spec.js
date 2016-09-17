describe('Blog factory', function() {
  var blogCtrl;

  beforeEach(angular.mock.module('blog'));

  beforeEach(inject(function(_blogCtrl_) {
    blogCtrl = _blogCtrl_;
  }));

  it('should exist', function() {
    expect(blogCtrl).toBeDefined();
  });
});

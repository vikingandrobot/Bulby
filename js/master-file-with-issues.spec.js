const dangerousCrypto = require('./master-file-with-issues').dangerousCrypto;

describe('dangerousCrypto', function() {
  it('should return `hash-5678`', function() {
    expect(dangerousCrypto(0.2)).toEqual('hash-5678');
  });
});

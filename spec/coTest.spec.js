const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;

describe('Co Test', function() {
  it('should get a correct handler based on product\'s name', function() {
    const productsAndHandlers = [
      {
        product: new Product('Normal Product', 10, 5),
        handler: 'updateNormal'
      },
      {
        product: new Product('Full Coverage', 10, 5),
        handler: 'updateFullCoverage'
      },
      {
        product: new Product('Mega Coverage', 10, 5),
        handler: 'updateMegaCoverage'
      },
      {
        product: new Product('Special Full Coverage', 10, 5),
        handler: 'updateSpecialFullCoverage'
      },
      {
        product: new Product('Super Sale', 10, 5),
        handler: 'updateSuperSale'
      }
    ]

    const coTest = new CarInsurance(productsAndHandlers.map((p) => p.product));

    productsAndHandlers.forEach((product, index) => {
      const handler = coTest.getProductHandler(index);
      expect(handler).equal(coTest[product.handler]);
    });
  });
  // it('should foo', function() {
  //   const coTest = new CarInsurance([ new Product('foo', 0, 0) ]);
  //   const products = coTest.updatePrice();
  //   expect(products[0].name).equal('foo');
  // });
});

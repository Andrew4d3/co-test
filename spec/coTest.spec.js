const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;

describe('Co Test', function() {
  it('should get a correct handler based on product\'s name', function() {
    const productsAndHandlers = [
      {
        product: new Product('Normal Product', 10, 5),
        handler: 'bound updateNormal'
      },
      {
        product: new Product('Full Coverage', 10, 5),
        handler: 'bound updateFullCoverage'
      },
      {
        product: new Product('Mega Coverage', 10, 5),
        handler: 'bound updateMegaCoverage'
      },
      {
        product: new Product('Special Full Coverage', 10, 5),
        handler: 'bound updateSpecialFullCoverage'
      },
      {
        product: new Product('Super Sale', 10, 5),
        handler: 'bound updateSuperSale'
      }
    ]

    const coTest = new CarInsurance(productsAndHandlers.map((p) => p.product));

    productsAndHandlers.forEach((product, index) => {
      const handler = coTest.getProductHandler(index);
      expect(handler.name).equal(product.handler);
    });
  });

  it('should update a normal product correctly', function() {
    const product = new Product('Normal Product', 10, 25);
    const coTest = new CarInsurance([ product ]);
    let day = 0;
    console.log(`\nDay ${day++}:`, product);
    // After 1 day
    let products = coTest.updatePrice();
    expect(products[0].price).equal(24);
    expect(products[0].sellIn).equal(9);
    console.log(`Day ${day++}:`, products[0]);
    // After 10 days more
    for (let i = 0; i < 10; i++) {
      products = coTest.updatePrice();
      console.log(`Day ${day++}:`, products[0]);
    }
    expect(products[0].price).equal(13);
    expect(products[0].sellIn).equal(-1);
    // After 15 days more
    for (let i = 0; i < 15; i++) {
      products = coTest.updatePrice();
      console.log(`Day ${day++}:`, products[0]);
    }

    expect(products[0].price).equal(0);
    expect(products[0].sellIn).equal(-16);
  });

  it('should update a full coverage product correctly', function() {
    const product = new Product('Full Coverage', 10, 25);
    const coTest = new CarInsurance([ product ]);
    let day = 0;
    console.log(`\nDay ${day++}:`, product);
    // After 1 day
    let products = coTest.updatePrice();
    expect(products[0].price).equal(26);
    expect(products[0].sellIn).equal(9);
    console.log(`Day ${day++}:`, products[0]);
    // After 15 days more
    for (let i = 0; i < 15; i++) {
      products = coTest.updatePrice();
      console.log(`Day ${day++}:`, products[0]);
    }
    expect(products[0].price).equal(47);
    expect(products[0].sellIn).equal(-6);
    // After 5 days more
    for (let i = 0; i < 5; i++) {
      products = coTest.updatePrice();
      console.log(`Day ${day++}:`, products[0]);
    }
    expect(products[0].price).equal(50);
    expect(products[0].sellIn).equal(-11);
  });

  it('should keep the mega coverage products unaltered', function() {
    const product = new Product('Mega Coverage', 10, 80);
    const coTest = new CarInsurance([ product ]);
    let day = 0;
    console.log(`\nDay ${day++}:`, product);
    let products = coTest.updatePrice();
    // After 1 day
    expect(products[0].price).equal(80);
    expect(products[0].sellIn).equal(10);
    console.log(`Day ${day++}:`, products[0]);
    // After 15 days more
    for (let i = 0; i < 15; i++) {
      products = coTest.updatePrice();
      console.log(`Day ${day++}:`, products[0]);
    }

    expect(products[0].price).equal(80);
    expect(products[0].sellIn).equal(10);
  });

  it('should update a special full coverage product correctly', function() {
    const product = new Product('Special Full Coverage', 12, 28);
    const coTest = new CarInsurance([ product ]);
    let day = 0;
    console.log(`\nDay ${day++}:`, product);
    let products = coTest.updatePrice();
    // After 1 day
    expect(products[0].price).equal(29);
    expect(products[0].sellIn).equal(11);
    console.log(`Day ${day++}:`, products[0]);

    // After 3 days more (less than 10 days left)
    for (let i = 0; i < 3; i++) {
      products = coTest.updatePrice();
      console.log(`Day ${day++}:`, products[0]);
    }

    expect(products[0].price).equal(34);
    expect(products[0].sellIn).equal(8);
    // After 5 days more (less than 5 days left)
    for (let i = 0; i < 5; i++) {
      products = coTest.updatePrice();
      console.log(`Day ${day++}:`, products[0]);
    }

    expect(products[0].price).equal(46);
    expect(products[0].sellIn).equal(3);
    // After 5 days more (No days left)
    for (let i = 0; i < 5; i++) {
      products = coTest.updatePrice();
      console.log(`Day ${day++}:`, products[0]);
    }

    expect(products[0].price).equal(0);
    expect(products[0].sellIn).equal(-2);
  });

  it('should update a super sale product correctly', function() {
    const product = new Product('Super Sale', 10, 35);
    const coTest = new CarInsurance([ product ]);
    let day = 0;
    console.log(`\nDay ${day++}:`, product);
    let products = coTest.updatePrice();
    // After 1 day
    expect(products[0].price).equal(33);
    expect(products[0].sellIn).equal(9);
    console.log(`Day ${day++}:`, products[0]);
    // After 10 days more
    for (let i = 0; i < 10; i++) {
      products = coTest.updatePrice();
      console.log(`Day ${day++}:`, products[0]);
    }

    expect(products[0].price).equal(11);
    expect(products[0].sellIn).equal(-1);
    // After 5 days more
    for (let i = 0; i < 5; i++) {
      products = coTest.updatePrice();
      console.log(`Day ${day++}:`, products[0]);
    }

    expect(products[0].price).equal(0);
    expect(products[0].sellIn).equal(-6);
  });
});

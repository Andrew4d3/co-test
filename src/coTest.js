class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }
}

class CarInsurance {
  constructor(products = []) {
    this.products = products;
    this.normalDecrementer = 1;
  }

  getProductHandler(i) {
    const { name } = this.products[i];
    if (name === 'Full Coverage') {
      return this.updateFullCoverage.bind(this, i);
    } else if (name === 'Mega Coverage') {
      return this.updateMegaCoverage.bind(this, i);
    } else if (name === 'Special Full Coverage') {
      return this.updateSpecialFullCoverage.bind(this, i);
    } else if (name === 'Super Sale') {
      return this.updateSuperSale.bind(this, i);
    } else {
      return this.updateNormal.bind(this, i);
    }
  }

  updateNormal(i) {
    const product = this.products[i];
    const decrementer = product.sellIn > 0 ? this.normalDecrementer : this.normalDecrementer * 2;
    product.price = product.price > 0 ? product.price - decrementer : product.price;
    product.price = product.price < 0 ? 0 : product.price;
    product.sellIn -= 1;
  }

  updateFullCoverage(i) {
    const product = this.products[i];
    const incrementer = product.sellIn > 0 ? 1 : 2;
    product.price = product.price < 50 ? product.price + incrementer : product.price;
    product.price = product.price > 50 ? 50 : product.price;
    product.sellIn -= 1;
  }

  updateMegaCoverage(i) {
    // DO NOTHING
  }

  updateSpecialFullCoverage(i) {
    const product = this.products[i];
    if (product.sellIn > 10) {
      product.price = product.price < 50 ? product.price + 1 : product.price;
    } else if (product.sellIn <= 10 && product.sellIn > 5) {
      product.price = product.price < 50 ? product.price + 2 : product.price;
    } else if (product.sellIn <= 5 && product.sellIn > 0) {
      product.price = product.price < 50 ? product.price + 3 : product.price;
    } else {
      product.price = 0;
    }
    product.price = product.price > 50 ? 50 : product.price;
    product.sellIn -= 1;
  }

  updateSuperSale(i) {
    const product = this.products[i];
    const decrementer = product.sellIn > 0 ? this.normalDecrementer * 2 : this.normalDecrementer * 4;
    product.price = product.price > 0 ? product.price - decrementer : product.price;
    product.price = product.price < 0 ? 0 : product.price;
    product.sellIn -= 1;
  }

  updatePrice() {
    const { products } = this;

    products.forEach((product, i) => {
      const handler = this.getProductHandler(i);
      handler();
    });

    return this.products;
  }
}

module.exports = {
  Product,
  CarInsurance
};

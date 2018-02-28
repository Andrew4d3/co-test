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
  }

  getProductHandler(i) {
    const { name } = this.products[i];
    if (name === 'Full Coverage') {
      return this.updateFullCoverage;
    } else if (name === 'Mega Coverage') {
      return this.updateMegaCoverage;
    } else if (name === 'Special Full Coverage') {
      return this.updateSpecialFullCoverage;
    } else if (name === 'Super Sale') {
      return this.updateSuperSale;
    } else {
      return this.updateNormal;
    }
  }

  updateNormal(i) {
    return this.products[i]
  }

  updateFullCoverage(i) {
    return this.products[i]
  }

  updateMegaCoverage(i) {
    return this.products[i]
  }

  updateSpecialFullCoverage(i) {
    return this.products[i]
  }

  updateSuperSale(i) {
    return this.products[i]
  }

  updatePrice() {
    return this.products
  }
}

module.exports = {
  Product,
  CarInsurance
}

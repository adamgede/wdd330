import { renderListWithTemplate } from "./utils.mjs";

// ProductList.mjs
function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement, titleElement) {
        // We passed in this information to make our class as reusable as possible.
        // Being able to define these things when we use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.titleElement = titleElement;
    }

    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData(this.category);
        this.titleElement.textContent = this.category;
        this.renderList(list); // render the list 
    }
      
    renderList(list) {
        // const html = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML('afterbegin', html.join(''));
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderpaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";

async function loadPage() {
  try {
    await Promise.all([await loadProductsFetch(), await loadCartFetch()]);
  } catch (error) {
    console.log("unexpected error!");
  }

  renderOrderSummary();
  renderpaymentSummary();
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderOrderSummary();
  renderpaymentSummary();
});
*/
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1");
  });
})

  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })

  .then(() => {
    renderOrderSummary();
    renderpaymentSummary();
  });

  */

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderpaymentSummary();
  });
});
*/

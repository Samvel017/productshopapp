let mainShop = document.querySelector('.main-shop');
let requestUrl = 'https://fakestoreapi.com/products';
let cartBtn = document.querySelector('#cartBtn');
let cartCost = document.querySelector('#cartCost');
let prodCount = document.querySelector('#prodCount');
let cartContainer = document.querySelector('.cart-container');

// ----------- XHR and DOM ---------------

let boughtItems = [];

let cost = 0;

const xhr = new XMLHttpRequest();
xhr.open('GET', requestUrl);

xhr.onload = () => {
  let products = JSON.parse(xhr.response);
  console.log(products);
  products.forEach((el) => {
    let prodBox = document.createElement('div');
    prodBox.classList.add('product-box');
    prodBox.innerHTML = `
    <div class="product-image">
      <img src="${el.image}" alt=""/>
    </div>
    <div class="product-info">
      <div class="product-top">
        <div class="product-title">
          <h3>${el.title}</h3>
          <h4>${el.category}</h4>
        <div>
        <strong>$${el.price}</strong>
      </div>
      <p>
      <span>Rated ${el.rating.rate} out of 5</span>
      <span>${el.rating.count} Reviews</span>
      </p>
      <div class="star">
      <i class="fas fa-star"></i><i class="fas fa-star"></i>
      <i class="fas fa-star"></i><i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      </div>
    </div>
    <button class="btn btnBuy">Add to Cart</button>
    `;
    let btnBuy = prodBox.querySelector('.btnBuy');

    btnBuy.addEventListener('click', () => {
      cost += el.price;
      cartCost.innerHTML = `$${cost.toFixed(2)}`;
      let cartBox = document.createElement('div');
      cartBox.classList.add('cart-box');
      cartBox.innerHTML = `
      <div class="cartImg"><img alt="" src="${el.image}" /></div>
      <div class="cancelBox">
        <h5>$${el.price}</h5>
        <button class="btn btnCancel">Cancel</button>
      </div>
      `;
      let btnCancel = cartBox.querySelector('.btnCancel');
      btnCancel.addEventListener('click', () => {
        cartBox.remove();
        cost -= el.price;
        cartCost.innerHTML = `$${cost.toFixed(2)}`;
        let index = boughtItems.indexOf(el);
        if (index != '-1') {
          boughtItems.splice(index, 1);
        }
        prodCount.innerHTML = `${boughtItems.length}`;
        console.log(boughtItems);
      });
      boughtItems.push(el);
      prodCount.innerHTML = `${boughtItems.length}`;
      console.log(boughtItems);
      cartContainer.append(cartBox);
    });
    mainShop.append(prodBox);
  });
};
xhr.send();

let cartMenu = document.querySelector('.cart-menu');
let closeMenu = document.querySelector('.closeMenu');

cartBtn.addEventListener('click', () => {
  cartMenu.classList.toggle('open');
});
closeMenu.addEventListener('click', () => {
  cartMenu.classList.toggle('open');
});

// -----------------------------------

// -------------- Cart on scroll ----------
let cart = document.querySelector('.cart');

window.addEventListener('scroll', function () {
  var x = window.pageYOffset;
  if (x > 100) {
    cart.classList.add('cartScroll');
  } else {
    cart.classList.remove('cartScroll');
  }
});

// --------------------------------------

// ------------- confirm btn in cart -------------

let confirmBtn = document.querySelector('.confirmBtn');

confirmBtn.addEventListener('click', () => {
  if (boughtItems != '') {
    let alertBox = document.createElement('div')
    alertBox.classList.add('alertBox')
    alertBox.innerHTML = `You have successfully bought these products!`
    document.body.prepend(alertBox)
    setTimeout(()=>{
      alertBox.remove()
    }, 2000)
    boughtItems = [];
    prodCount.innerHTML = `${boughtItems.length}`;
    cost = 0;
    cartCost.innerHTML = `$${cost}`;
    cartMenu.classList.toggle('open');
    let cartBoxes = cartContainer.querySelectorAll('.cart-box');
    cartBoxes.forEach((e) => {
      e.remove();
    });
  } else {
    alert('Cart is empty!');
  }
});

// ----------------------------------------------

// -------------- Sort Button --------------------

let sortBtn = document.querySelector('.sortBtn');

sortBtn.addEventListener('click', () => {
  let cartBoxes = cartContainer.querySelectorAll('.cart-box');
  cartBoxes.forEach((e) => {
    e.remove();
  });
  let sortedItems = boughtItems.sort((a,b) => {return b.price-a.price})
  sortedItems.forEach((el)=>{
    let cartBox = document.createElement('div');
      cartBox.classList.add('cart-box');
      cartBox.innerHTML = `
      <div class="cartImg"><img alt="" src="${el.image}" /></div>
      <div class="cancelBox">
        <h5>$${el.price}</h5>
        <button class="btn btnCancel">Cancel</button>
      </div>
      `;
      let btnCancel = cartBox.querySelector('.btnCancel');
      btnCancel.addEventListener('click', () => {
        cartBox.remove();
        cost -= el.price;
        cartCost.innerHTML = `$${cost.toFixed(2)}`;
        let index = boughtItems.indexOf(el);
        if (index != '-1') {
          boughtItems.splice(index, 1);
        }
        prodCount.innerHTML = `${boughtItems.length}`;
        console.log(boughtItems);
      });
      cartContainer.append(cartBox);
  })
});

// -----------------------------------------------

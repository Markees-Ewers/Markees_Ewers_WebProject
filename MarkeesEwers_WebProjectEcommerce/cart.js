// Array to store cart items
let cart = [];

// Function to handle adding items to the cart
function addToCart(item, price) {
    const cartItem = { item: item, price: parseFloat(price) };
    cart.push(cartItem);
    alert(`${item} added to cart!`);
    console.log(cart); // Optionally log the cart contents in the console
}

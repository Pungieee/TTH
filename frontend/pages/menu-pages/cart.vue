<template>
    <div class="cart">
        <h1>Your Cart</h1>
        <div v-if="cartItems.length === 0" class="empty-cart">Your cart is empty</div>
        <div v-else>
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
                <img :src="item.pic" alt="Product Image" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>{{ item.name }}</h4>
                    <p class="item-price">Price: {{ item.price }}</p>
                    <div class="quantity-control">
                        <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1"
                            class="quantity-button">-</button>
                        <span class="quantity">{{ item.quantity }}</span>
                        <button @click="updateQuantity(item.id, item.quantity + 1)" class="quantity-button">+</button>
                    </div>
                    <button @click="removeFromCart(item.id)" class="remove-button">Remove</button>
                </div>
            </div>
            <button @click="checkout" class="checkout-button">Checkout</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            cartItems: [],
            userId: '1', // You may replace this with the actual user ID
        };
    },
    created() {
        this.fetchCartItems();
    },
    methods: {
        async fetchCartItems() {
            try {
                const response = await axios.get(`http://localhost:4000/api/cart/${this.userId}`);
                this.cartItems = response.data;
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        },
        async updateQuantity(cartId, quantity) {
            try {
                await axios.put(`http://localhost:4000/api/cart/${this.userId}/update/${cartId}`, { quantity });
                this.fetchCartItems(); // Refresh cart items after updating quantity
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        },
        async removeFromCart(cartId) {
            try {
                await axios.delete(`http://localhost:4000/api/cart/${this.userId}/remove/${cartId}`);
                this.fetchCartItems(); // Refresh cart items after removing product
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        },
        checkout() {
            // Implement checkout logic
            console.log('Checkout');
        },
    },
};
</script>

<style scoped>
.cart {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column; /* Stack items vertically */
}

.cart h1 {
    margin-bottom: 20px;
    font-size: 2rem;
    color: #333;
}

.empty-cart {
    font-size: 1.2rem;
    color: #666;
}

.cart-item {
    display: flex;
    flex-wrap: wrap;
    /* add this to allow items to wrap to the next line */
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
width: 150px;
height: auto;
margin-right: 20px;
border-radius: 5px;
}

.cart-item-details {
    flex-basis: 50%;
    /* set a basis for the details section */
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.item-price {
    margin-bottom: 10px;
}

.quantity-control {
    display: flex;
    align-items: center;
}

.quantity-button {
    background-color: #f0f0f0;
    color: #333;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
    margin: 0 5px;
    cursor: pointer;
}

.quantity {
    font-size: 1.2rem;
    margin: 0 5px;
}

.remove-button {
    background-color: #ff6666;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    margin-top: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.remove-button:hover {
    background-color: #ff4d4d;
}

.checkout-button {
    background-color: #66cc66;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1.2rem;
    display: block;
    margin-left: auto;
}

.checkout-button:hover {
    background-color: #4dbd4d;
}
</style>

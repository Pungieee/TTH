<template>
    <div class="background">
        <div class="head-con"></div>
        <div class="container">
            <div v-for="product in products" :key="product.id" class="product-card">
                <div class="sale-badge" v-if="product.onSale">Sale</div>
                <img :src="product.pic" alt="Product Image">
                <h3 class="title">{{ product.name }}</h3>
                <h4 class="price">{{ product.price }}</h4>
                <button type="button" @click="addToCart(product)">
                    <i class="fa-solid fa-cart-shopping" style="color: #544238;"></i></button>
                <button type="button" @click="addToFavorites(product)"><i class="fa-solid fa-heart"
                        style="color: #544238;"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const products = ref([]);
        const favorites = ref([]);
        const userId = 1; // Set the user ID to 1

        onMounted(async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/sale');
                products.value = response.data.map(product => ({
                    ...product,
                    onSale: true, // Assuming all products fetched from the sale endpoint are on sale
                }));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        });

        const addToCart = async (product) => {
            try {
                await axios.post(`http://localhost:4000/api/cart/${userId}/add`, {
                    productId: product.id,
                    quantity: 1 // Assuming quantity is 1 when adding to cart
                });
                console.log('Product added to cart:', product);
            } catch (error) {
                console.error('Error adding product to cart:', error);
            }
        };

        const addToFavorites = async (product) => {
            try {
                await axios.post(`http://localhost:4000/api/fav/${userId}/add`, {
                    productId: product.id
                });
                // Update favorites list
                favorites.value.push(product);
                console.log('Adding product to favorites:', product);
            } catch (error) {
                console.error('Error adding product to favorites:', error);
            }
        };

        return { products, addToCart, addToFavorites, favorites };
    },
};
</script>

<style scoped>
.background {
    background-color: #FFF9ED;
}

.head-con {
    text-align: center;
    padding: 2rem;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0px 20px;
}

.product-card {
    position: relative;
    width: calc(33.33% - 20px);
    margin-bottom: 20px;
    background: #E5E0D5;
    box-sizing: border-box;
    padding: 10px;
}

.product-card img {
    width: 100%;
    height: 500px;
    object-fit: cover;
}

.title,
.price {
    color: #544238;
}

.old-price {
    text-decoration: line-through;
    margin-right: 10px;
}

.sale-price {
    color: red;
}

.sale-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: red;
    color: white;
    padding: 5px;
    border-radius: 5px;
}

.product-card:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
}

a {
    text-decoration: none;
}
</style>

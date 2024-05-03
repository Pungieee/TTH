<template>
    <div class="favorite-products">
        <h1>Favorite Products</h1>
        <div v-if="isLoading" class="loading">Loading...</div>
        <div v-else>
            <div v-if="favoriteProducts.length === 0" class="no-products">
                No favorite products found for this user.
            </div>
            <div v-else>
                <div v-for="product in favoriteProducts" :key="product.id" class="product-item">
                    <img :src="product.pic" alt="Product Image" class="product-image">
                    <div class="product-details">
                        <h2>{{ product.name }}</h2>
                        <p class="price"> {{ product.price }}</p>
                    </div>
                    <div class="product-actions">
                        <button @click="removeFromFavorites(product.id)" class="remove-button">
                            <i class="fas fa-heart"></i> <!-- Heart icon for remove -->
                        </button>
                        <button @click="addToCart(product)" class="add-to-cart-button">
                            <i class="fas fa-cart-plus"></i> <!-- Cart plus icon for add to cart -->
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            favoriteProducts: [],
            isLoading: false,
            userId: 1, // Hardcoded user ID for demo purposes
        };
    },
    mounted() {
        this.loadFavoriteProducts();
    },
    methods: {
        loadFavoriteProducts() {
            this.isLoading = true;
            fetch(`http://localhost:4000/api/fav/${this.userId}`)
                .then(response => response.json())
                .then(data => {
                    this.favoriteProducts = data;
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching favorite products:', error);
                    this.isLoading = false;
                });
        },
        removeFromFavorites(favoriteId) {
            if (!confirm('Are you sure you want to remove this product from favorites?')) {
                return;
            }
            fetch(`http://localhost:4000/api/fav/${this.userId}/remove/${favoriteId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        alert('Product removed from favorites successfully!');
                        this.loadFavoriteProducts();
                    } else {
                        console.error('Failed to remove product from favorites:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error removing product from favorites:', error);
                });
        },
        addToCart(product) {
            fetch(`http://localhost:4000/api/cart/${this.userId}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.product_id, // Using product.product_id as productId
                    quantity: 1, // Assuming quantity is 1 when adding to cart
                }),
            })
                .then(response => {
                    if (response.ok) {
                        alert('Product added to cart successfully!');
                        // Optionally, you can navigate to the cart page or update cart state
                    } else {
                        console.error('Failed to add product to cart:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error adding product to cart:', error);
                });
        },

    },
};
</script>

<style scoped>
.favorite-products {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.favorite-products h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #333;
}

.loading,
.no-products {
    font-size: 1.5rem;
    color: #666;
    text-align: center;
}

.product-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border: 1px solid #eee;
}

.product-item:last-child {
    margin-bottom: 0;
}

.product-image {
    width: 120px;
    height: 120px;
    margin-right: 20px;
    border-radius: 5px;
    object-fit: cover;
}

.product-details {
    flex: 1;
    padding-left: 20px;
}

.product-details h2 {
    font-size: 2rem;
    margin-bottom: 5px;
}

.price {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
}

.product-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.product-actions button {
    font-size: 1.2rem;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: transparent;
}

.remove-button {
    color: #ff6666;
    margin-right: 10px;
}

.remove-button:hover {
    background-color: #ffebee;
}

.add-to-cart-button {
    color: #66cc66;
}

.add-to-cart-button:hover {
    background-color: #e8f5e9;
}
</style>
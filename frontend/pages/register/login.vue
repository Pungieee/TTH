<template>
    <div class="background">
        <div class="container">
            <div class="header">
                <h1>Login to your account</h1>
            </div>
            <div class="dct">
                <p>Enter your email to Log in</p>
            </div>
            <div class="input-box">
                <input type="text" v-model="email" id="email" class="tab" placeholder="Enter your email">
                <input type="password" v-model="password" id="password" class="tab" placeholder="Enter your password">
            </div>
            <div class="login-btn">
                <button @click="login" class="tab-style">
                    <p>Log in</p>
                </button>
            </div>
            <div id="signup"><a href="/register/signup">
                    <button class="tab-signup">Sign up</button></a>
            </div>

            <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            successMessage: '',
            errorMessage: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:4000/api/login', {
                    email: this.email,
                    password: this.password,
                });

                // Extract user ID and cart data from the response
                const { userId, cart, message } = response.data;
                this.successMessage = message;

                // Update cartItems with the cart data received from the backend
                this.cartItems = cart;

                // Redirect to the account page if login is successful
                if (this.successMessage) {
                    this.$router.push('/menu-pages/account');
                }
            } catch (error) {
                console.error(error.response.data);
                this.errorMessage = error.response.data.error;
                this.successMessage = '';
            }
        },
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.success-message {
    color: green;
    margin-top: 10px;
    margin-bottom: 40px;
}

.error-message {
    color: red;
    margin-top: 10px;
    margin-bottom: 40px;
}

.background {
    background-color: #fff9ed;
    padding: 80px 0px;

}

.container {
    padding-top: 40px;
    margin: auto;
    text-align: center;
    border: 1px solid #544238;
    border-radius: 40px;
    background-color: #E8DDCC;
    width: 65%;
    max-width: 600px;
}

.header {
    color: #544238;
    padding: 5px;
}

.dct {
    font-size: 16px;
    color: #544238;
    padding: 0px 0px 40px;
}

.input-box input {
    width: 90%;
    height: 45px;
    padding: 0 10px 0 15px;
    border-radius: 15px;
    border: 2px solid #bebebe;
    transition: .2s ease;
    font-size: 14px;
}

.input-box input:focus {
    background: rgb(230, 230, 230);
}

.input-box input {
    margin-bottom: 10px;
}

.login-btn {
    margin-top: 30px;
    margin-bottom: 10px;
}

.login-btn p {
    color: #e9e9e9;
    font-weight: bold;
}

.tab-style {
    font-size: 16px;
    background-color: #544238;
    color: white;
    padding: 16px;
    border: none;
    border-radius: 15px;
    width: 90%;
    cursor: pointer;
}

.tab-signup {
    font-size: 16px;
    background-color: #b7a59b;
    color: white;
    padding: 15px;
    width: 90%;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    margin-bottom: 40px;
}

a {
    text-decoration: none;
    color: #fff;
}
</style>
<template>
    <div class="background">
        <div class="container">
            <div class="header">
                <h1>Create an account</h1>
            </div>
            <div class="dct">
                <p>Enter your email to Sign up</p>
            </div>
            <div class="input-box">
                <input type="text" v-model="email" class="tab" placeholder="Enter your email">
                <input type="password" v-model="password" class="tab" placeholder="Enter your password">
            </div>
            <div id="checkbox">
                <input type="checkbox" id="agree" name="agree" v-model="agree" required>
                <label for="agree">
                    I agree to <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                </label>
            </div>
            <div class="signup-btn">
                <button :disabled="!agree" @click="signup" class="tab-style">
                    <p>Sign up</p>
                </button>
            </div>
            <div class="login">
                <p>Already have an account? <a href="/register/login">Login</a></p>
            </div>

            <p v-if="successMessage" v-html="successMessage"></p>
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
            agree: false,
            successMessage: '',
            errorMessage: '',
        };
    },
    methods: {
        async signup() {
            if (!this.agree) {
                // Add an error message if the user hasn't agreed to the terms
                this.errorMessage = 'Please agree to the Terms of Service and Privacy Policy';
                return;
            }

            try {
                const response = await axios.post('http://localhost:4000/api/signup', {
                    email: this.email,
                    password: this.password,
                });

                this.successMessage = 'Your account has been created successfully. <a href="/register/login">Click here to login</a>';
                this.errorMessage = ''; // Clear any previous error messages
            } catch (error) {
                console.error(error.response.data);
                this.errorMessage = error.response.data.error; // Set error message
                this.successMessage = ''; // Clear any previous success messages
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

/* Add success message styling */
.success-message {
    color: green;
    margin-top: 10px;
}

/* Add error message styling */
.error-message {
    color: red;
    margin-top: 10px;
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

.checkbox {
    font-size: 16px;
    margin: 30px 0px;
    margin-left: -400px;

    & a {
        color: #333;
    }
}

.signup-btn {
    margin: 30px 0px;
}

.signup-btn p {
    color: #e9e9e9;
    font-weight: bold;
}

.login {
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 30px;
}

a {
    color: #333;
}

.tab-style {
    font-size: 16px;
    background-color: #544238;
    color: #e9e9e9;
    padding: 16px;
    border: none;
    width: 90%;
    border-radius: 15px;
    cursor: pointer;
}

.disabled-button {
    pointer-events: none;
}

.error-message {
    color: red;
    font-size: 16px;
    margin-bottom: 30px;
}
</style>
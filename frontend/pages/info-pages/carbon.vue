<template>
    <div class="background">
        <div class="hero1">
            <div class="text1">
                <h1>Track Your Footprint</h1>
                <br>
                <h3>Your Carbon Footprint Today: {{ todayCarbonFootprint }}</h3>
            </div>
            <img src="/public/image/foot.png">
        </div>

        <div class="hero2">
            <div class="text2">
                <h1>Track product's carbon footprint</h1>
            </div>
            <div class="input-con">
                <div class="input">
                    <p>Product Name</p>
                    <input type="text" v-model="productName">
                </div>
                <div class="input">
                    <p>Category</p>
                    <input type="text" v-model="category">
                </div>
                <div class="input">
                    <p>Carbon Footprint</p>
                    <input type="number" v-model="carbonFootprint">
                </div>
                <div class="input">
                    <p>Description</p>
                    <textarea v-model="description"></textarea>
                </div>
            </div>
            <a id="submit" href="#" @click="submitForm">Submit</a>
        </div>

        <!-- Carbon Footprint History -->
        <div class="hero3">
            <div class="text3">
                <h1>Carbon Footprint History</h1>
                <div class="history-container">
                    <div class="history-item" v-for="(item, index) in history" :key="index">
                        <div class="history-details">
                            <div class="history-info">
                                <p><strong>Product:</strong> {{ item.product_name }}</p>
                                <p><strong>Description:</strong> {{ item.description }}</p>
                            </div>
                            <div class="history-data">
                                <p><strong>Carbon Footprint:</strong> {{ item.carbon_footprint }} Kg.</p>
                                <p><strong>Date:</strong> {{ item.date }}</p>
                            </div>
                        </div>
                        <button class="delete-button" @click="deleteItem(index)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            todayCarbonFootprint: 0,
            productName: '',
            category: '',
            carbonFootprint: '',
            description: '',
            history: [] // Add a new data property for storing the carbon footprint history
        };
    },
    methods: {
        submitForm() {
            const formData = {
                productName: this.productName,
                category: this.category,
                carbonFootprint: this.carbonFootprint,
                description: this.description
            };

            axios.post('http://localhost:4000/api/carbon/submit', formData)
                .then(response => {
                    console.log(response.data);
                    // Reset form fields after successful submission if needed
                    this.productName = '';
                    this.category = '';
                    this.carbonFootprint = '';
                    this.description = '';
                    // Reload carbon footprint history
                    this.fetchCarbonFootprintHistory();
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    // Handle error
                });
        },
        fetchCarbonFootprintHistory() {
            axios.get('http://localhost:4000/api/carbon/history')
                .then(response => {
                    console.log(response.data);
                    this.history = response.data;
                })
                .catch(error => {
                    console.error('Error fetching carbon footprint history:', error);
                    // Handle error
                });
        },
        fetchTodayCarbonFootprint() {
            axios.get('http://localhost:4000/api/carbon/today')
                .then(response => {
                    console.log(response.data);
                    this.todayCarbonFootprint = response.data.totalCarbonFootprint || 0;
                })
                .catch(error => {
                    console.error('Error fetching today\'s carbon footprint:', error);
                    // Handle error
                });
        },
        deleteItem(index) {
            const carbonId = this.history[index].id;
            axios.delete(`http://localhost:4000/api/carbon/${carbonId}`)
                .then(response => {
                    console.log(response.data);
                    // Remove deleted item from history
                    this.history.splice(index, 1);
                })
                .catch(error => {
                    console.error('Error deleting item:', error);
                    // Handle error
                });
        }
    },
    mounted() {
        this.fetchCarbonFootprintHistory();
        this.fetchTodayCarbonFootprint();
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.background {
    /* Add your background styles */
}

.hero1 {
    display: flex;
    padding: 120px 176px;
    justify-content: space-between;
    background-color: #E4E8CC;
}

.hero1 img {
    width: 512px;
    height: 512px;
}

.text1 {
    margin-top: 100px;
    font-size: 2rem;
}

.hero2 {
    height: 567px;
    background-color: #FFF6CF;
    text-align: center;
    padding-top: 100px;
}

.text2 {
    text-align: center;
    padding: 40px;
}

.input-con {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
}

.input {
    text-align: center;
    margin: 0 50px;
}

.input p {
    margin-top: 10px;
}

#submit {
    color: #333;
    background-color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 20px;
    border: #333 2px solid;
}

/* Carbon Footprint History styles */
.hero3 {
    background-color: #fff9ed;
    padding: 40px 60px;
}

.text3 {
    padding: 20px;
    text-align: center;
}

.history-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.history-item {
    width: 70%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.history-details {
    flex: 1;
}

.history-info p,
.history-data p {
    margin: 5px 0;
}

.delete-button {
    background-color: #f44336;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.delete-button:hover {
    background-color: #d32f2f;
}
</style>


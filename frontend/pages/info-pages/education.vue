<template>
    <div class="background">

        <div class="head">
            <h1>Learning Hub</h1>
            <label><a id="get" href="#">Get Article</a></label>
        </div>

        <div class="section">

            <div class="info-con">
                <br>
                <br>
                <p id="topic">
                    Submit your article<br>
                    and join our network!
                </p>
                <br>
                <br>
                <p>"Hey there, eco-warriors! Ready to make a difference? Join our vibrant community of<br> authors and
                    share
                    your eco-savvy knowledge and experiences with our awesome<br> readers. Plus, seize the chance to
                    become
                    a key player in our dynamic and eco-chic team!<br> Let's collaborate and make sustainable fashion
                    the
                    new trend!"
                </p>
                <br>
                <br>
                <a id="submit" href="#"><i class="fa-solid fa-arrow-right"></i> Submit Article
                </a>
            </div>

            <div class="img-con">
                <img src="/public/image/1.png">
                <img id="middle-img" src="/public/image/2.png">
                <img src="/public/image/3.png">
            </div>
        </div>
        <div class="popular-articles-con">
            <h2>Popular Articles</h2>
            <div class="article" v-for="(article, index) in popularArticles" :key="index">
                <img :src="article.article_pic" :class="'article-img-' + index" alt="Article Image">
                <div class="article-details">
                    <h3>{{ article.article_title }}</h3>
                    <p>{{ article.article_descrip }}</p>
                    <a :href="article.article_link" class="read-more-btn">Read More</a>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const popularArticles = ref([]);

// Fetch popular articles from the backend on component mount
onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/education/articles');
        popularArticles.value = response.data;
    } catch (error) {
        console.error('Error loading popular articles:', error);
    }
});
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.background {
    background-color: #fff9ed;
    padding: 100px 60px;
}

.head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* vertically center align items */
}

.section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* vertically center align items */
}

h1 {
    font-size: 3rem;
    color: #333;
    /* Set heading color */
}

#topic {
    font-size: 2rem;
    /* Reduce font size for topic */
    color: #333;
    /* Set text color */
}

.img-con {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* vertically center align items */
}

#middle-img {
    margin-bottom: -20px;
    /* Adjust margin */
    margin-top: 20px;
    /* Adjust margin */
}

#submit,
#get {
    display: inline-block;
    text-decoration: none;
    color: #333;
    background-color: #fbf3eb;
    padding: 10px 20px;
    border: 2px solid #333;
    /* Add border */
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    /* Add transition effect */
}

#submit:hover,
#get:hover {
    background-color: #ffac33;
    color: white;
    border-color: #ff9800;
    /* Change border color on hover */
}

.info-con {
    max-width: 50%;
    /* Limit max width */
}

.article {
    display: flex;
    margin-bottom: 40px; /* Increase margin bottom */
    margin-top: 30px;
    
}

.article img {
    width: 30%;
    /* Reduce image width */
    height: auto;
    margin-right: 20px;
    /* Add spacing between image and text */
}

.article-details {
    flex: 1;
    /* Take remaining space */
}

.read-more-btn {
    display: inline-block;
    padding: 8px 16px;
    background-color: #ff9800;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;
    /* Add transition effect */
    margin-top: 30px;
    /* Increase margin top */
    cursor: pointer;
        /* Add cursor */
}
.read-more-btn:hover {
    background-color: #ffac33;
}

.popular-articles-con {
    margin-top: 60px;
    /* Increase margin top */
    background-color: #f0f0f0;
    /* Change background color */
    padding: 30px;
    /* Add padding */
    border-radius: 8px;
    /* Add border radius */
}

h2 {
    font-size: 2rem;
    /* Set heading size */
    color: #333;
    /* Set heading color */
}
</style>


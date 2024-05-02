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
}

.section {
    display: flex;
    justify-content: space-between;
}

h1 {
    font-size: 3rem;
}

#topic {
    font-size: 3rem;
}

.img-con {
    width: 50%;
    display: flex;
    justify-content: space-between;
}

#middle-img {
    margin-bottom: -60px;
    margin-top: 60px;
}

#submit {
    text-decoration: none;
    color: #333;
    background-color: #fff;
    padding: 10px 20px;
    border-left: 4px solid #333;
}

#get {
    text-decoration: none;
    color: #333;
    background-color: #FBF3EB;
    padding: 10px 20px;
}
.article {
    margin-bottom: 30px;
}

.article img {
    max-width: 100%;
    height: auto;
}

.article-details {
    margin-top: 20px;
}

.read-more-btn {
    display: inline-block;
    padding: 8px 16px;
    background-color: #ff9800;
    color: white;
    border-radius: 4px;
    text-decoration: none;
}

.read-more-btn:hover {
    background-color: #ffac33;
}
.article-img-0 {
    width: 50%;
}

.article-img-1 {
    width: 40%;
}

.article-img-2 {
    width: 60%;
}


</style>
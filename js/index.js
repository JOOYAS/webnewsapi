const newscards = document.getElementById("articles");
const newsapi = "https://newsapi.org/v2/everything?q=technology&sortBy=popularity&apiKey=f913415ff5af44b5bc417d2bb5e6b7de";

fetch(newsapi) 
.then(result => result.json())
.then(data => {

    console.log(data);
    data.articles.forEach(article => {

        //news articles with no title and image will be rejected
        if(article.title && article.urlToImage) {

            //created a template for newscard
            //without declaring data from api goes directly into html
            const cardTemplate = `
                <article class="card" >
                    <div class="img-container">
                        <img src="${article.urlToImage}" class="news-image" alt="an image potraits the content of article">
                    </div>
                    <div class="card-content">
                        <span class="news-source">${article.source.name}</span>
                        <h3 class="news-heading">${article.title}</h3>
                        <p class="news-description">${article.description}</p>
                    </div>
                </article>
            `;
            
            // pasting the card template for every article
            const newCard = document.createElement('div');
            newCard.innerHTML = cardTemplate.trim();
            const card = newCard.firstChild;
           

            // Append the card to the news cards section
            newscards.appendChild(card); 
            
             //if imageurl not getting image pastes placeholder image
            const newsImage = card.querySelector(".news-image");
            newsImage.onerror = function() {
                newsImage.src = "./images/placeholder-img.jpg"
            };
        }
    });
            
})
.catch(error => console.log(error));
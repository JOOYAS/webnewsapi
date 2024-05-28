//javascript only runs after html elents fully loaded
document.addEventListener('DOMContentLoaded', () => {

    const newscards = document.getElementById("articles");
    const corsheader = 'https://api.allorigins.win/get?url=';
    const newsapi = encodeURIComponent("https://newsapi.org/v2/everything?q=technology&apiKey=f913415ff5af44b5bc417d2bb5e6b7de");

    fetch(corsheader + newsapi) 
    .then(result => result.json())
    .then(data => {

        console.log(data);
        JSON.parse(data.contents).articles.forEach(article => {

            //news articles with no title and image will be rejected
            if(article.title && article.urlToImage) {

                
                //created a template for newscard
                //without declaring data from api goes directly into html
                const cardTemplate = `
                    <article class="card" role="link">
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
                
                // Append the card to the news cards section
                const newCard = document.createElement('div');
                newCard.innerHTML = cardTemplate.trim();
                const card = newCard.firstChild;
                newscards.appendChild(card);

                //when clicked on card open the original source webpage
                card.addEventListener('click', () =>{
                    //const url = `${article.url}`;
                    //window.open(url, '_self');
                });

                //if imageurl not getting image pastes placeholder image
                const newsImage = card.querySelector(".news-image");
                newsImage.onerror = () => {
                    newsImage.src = "./images/placeholder-img.jpg"
                };
            };
        });
                
    })
    .catch(error => console.log(error));
});
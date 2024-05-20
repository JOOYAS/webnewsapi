//getting date and displaying
//var datestring = new Date();
//const formattedDate = datestring.toLocaleDateString('en-UK');
//console.log(formattedDate);
//document.getElementById("date").textContent = formattedDate;




const newscards = document.getElementById("articles");
const corsheader = 'https://api.allorigins.win/get?url=';
const newsapi = encodeURIComponent("https://newsapi.org/v2/everything?q=india&from=2024-04-29&to=2024-04-29&sortBy=popularity&apiKey=f913415ff5af44b5bc417d2bb5e6b7de");
fetch(corsheader + newsapi)
.then(result => result.json())
.then(data => {
    const cardTemplate = `
        <a href="" class="news-link">
            <article class="card">
                <div class="img-container">
                    <img src="" class="news-image" alt="">
                </div>
                <div class="card-content">
                    <span class="news-source"></span>
                    <h3 class="news-heading"></h3>
                    <p class="news-description"></p>
                </div>
            </article>
        </a>
        `;


        JSON.parse(data.contents).articles.forEach(article => {
        if(article.title && article.urlToImage) {
            // Clone the card template for each article
            const newCard = document.createElement('div');
            newCard.innerHTML = cardTemplate.trim();
            const card = newCard.firstChild;
        
            // Populate the card with data
            const sourceName = card.querySelector('.news-source');
            const newsHeader = card.querySelector('.news-heading');
            const newsImage = card.querySelector('.news-image');
            const newsDescription = card.querySelector('.news-description');
            //const newsLink = card.querySelector('.news-link');
            
            sourceName.textContent = article.source.name;
            newsHeader.textContent = article.title;
            newsDescription.textContent = article.description;
            newsImage.src = article.urlToImage;
            //newsLink.href = article.url;
                    
            newsImage.addEventListener('error', function() {
                newsImage.src = "./images/placeholder-img.jpg"
            });
            
            // Append the card to the news cards section
            newscards.appendChild(card);
        }
    });
            
})
.catch(error => console.log(error));




//console.log(data.articles);
 //   var i = 5;
 //   console.log(i,data.articles[i])
 //   var News = data.articles[i];
 //   var SourceName = News.source.name;
  //  var NewsHeader = News.title;
 //   var NewsImage = News.urlToImage;
 //   var NewsDescription = News.description
 //   sourcehtml.innerHTML = SourceName;
  //  headerhtml.innerHTML = NewsHeader;
   // reporthtml.innerHTML = NewsDescription;
  //  image.src = NewsImage;
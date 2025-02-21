//DEFINIRE CONST DELL'URL
const booksList = "https://striveschool-api.herokuapp.com/books"

//DEFINIRE CONST CHE RICHIAMA LA SEARCHBAR
const searchInput = document.getElementById("searchImput")

//DEFINIRE UNA VARIBILE CON UN ARRAY VUOTO PER TUTTI I LIBRI 
let allBooks = []

//DEFINIRE UNA VARIBILE CON UN ARRAY VUOTO PER I LIBRI NEL CARRELLO
let cart = []

//FUNZIONE RECUPERA DATI DAL ENDPOINT CON LA FETCH
function recuperaDati() {
    return fetch(booksList)
        .then(response => response.json())
        .then(books => {
            console.log(books);
            allBooks = books
            renderBooks(allBooks)
        })
        .catch(err => console.log(err))
}

//FUNZIONE CHE VISUALIZZA A SCHERMO I LIBRI
function renderBooks(books) {
    let resultsBook = document.getElementById("booksResults")
    resultsBook.classList.add("row", "gap-2", "justify-content-center")
    resultsBook.innerHTML = ""

    /* Definire const in cui mappo ogni book di books e richiamo la funzione che crea una card per ogni book */
    const libraryContainer = books.map((book) => createLibrary(book))

    /*Appendere a booksResults tutto libraryContainer > appendo tutte le cards al container grande */
    resultsBook.append(...libraryContainer)
}

//FUNZIONE CHE CREA LA LIBRERIA
//1. Alla funzione passo come parametro un oggetto con gli elementi dell'array
//   Creo il div per la card
//2. Creo l'immagine della card e lo appendo alla card
//3. Creo il div per il cardBody e lo appendo alla card
//   Creo il cardTitle, il genreBook e il priceBook e li appendo al cardBody
//4. Creo il div per la cardAction e lo appendo alla card
//   Creo 2 bottoni e li appendo alla Cardbody
//5. Ritorna l'intera card (cardLibrary)
function createLibrary({ img, title, category, price, asin }) {
    const cardLibrary = document.createElement("div")
    cardLibrary.classList.add("card", "col-6", "col-md-4", "col-lg-3")
    //--------------------------------------------------------//
    const imgCard = document.createElement("img")
    imgCard.classList.add("card-img-top")
    imgCard.src = img
    cardLibrary.appendChild(imgCard)
    //--------------------------------------------------------//
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    cardLibrary.appendChild(cardBody)

    const cardTitle = document.createElement("h4")
    cardTitle.classList.add("card-title",)
    cardTitle.innerText = title
    cardBody.appendChild(cardTitle)

    const genreBook = document.createElement("p")
    genreBook.classList.add("card-text")
    genreBook.innerText = "Genre: " + category
    cardBody.appendChild(genreBook)

    const priceBook = document.createElement("h5")
    priceBook.classList.add("card-text", "mb-2")
    priceBook.innerText = "€ " + price
    cardBody.appendChild(priceBook)

    const detail = document.createElement("a")
    detail.innerText = "More"
    detail.setAttribute('href', `bookDetail.html?bookId=${asin}`)
    cardBody.appendChild(detail)

    //--------------------------------------------------------//

    const cardAction = document.createElement("div")
    cardAction.classList.add("card-body")
    cardLibrary.appendChild(cardAction)

    const addToCart = document.createElement("button")
    addToCart.classList.add("btn", "btn-success")
    addToCart.innerText = "Add to Cart"
    cardAction.appendChild(addToCart)
   
    const hideBook = document.createElement("button")
    hideBook.classList.add("btn", "btn-warning")
    hideBook.innerText = "Hide"
    cardAction.appendChild(hideBook)

    //--------------------------------------------------------//

    // Aggiugnere evento click al bottone Cart
    addToCart.addEventListener("click", () =>{
        cart.push({img, title, category, price})
        console.log("Libro aggiunto al carrello:", cart)
        
        cardLibrary.style.border = "2px solid red"

        updateCart()
    })

    // Aggiugnere evento click al bottone Hide
    hideBook.addEventListener("click", () => {
        cardLibrary.style.display = "none";  // Nascondi direttamente la card
    })
    
    return cardLibrary
}


//FUNZIONE CHE AGGIORNA IL CARRELLO
function updateCart(){
    const cartContainer = document.getElementById("shoppingBook")
    cartContainer.innerHTML = ""
    
    cart.forEach((book, index) => {
        const cartItem = document.createElement("div")
        cartItem.classList.add("cart-item")

        const cartTitle = document.createElement("h5")
        cartTitle.innerText = book.title
        cartItem.appendChild(cartTitle)

        const cartPrice = document.createElement("p")
        cartPrice.innerText = "€ " + book.price
        cartItem.appendChild(cartPrice)

        const deleteIcon = document.createElement("button")
        deleteIcon.classList.add("btn", "btn-sm", "btn-danger")
        deleteIcon.innerHTML = '<i class="bi bi-trash"></i>'  
        cartItem.appendChild(deleteIcon)

        // Aggiugnere evento click al bottone delete
        deleteIcon.addEventListener("click", () => {
            cart.splice(index, 1); 
            updateCart();  
        });

        cartContainer.appendChild(cartItem);
    });
    
}



//CHIAMO LA FUNZIONE DELLA FECTH E CONCATENO LA FUNZIONE DI RENDER 
recuperaDati()
    .then(books => renderBooks(books))
    .catch(err => console.log(err))


//FUNZIONE CHE PERMETTE DI FARE UNA RICERCA FILTRANDO I LIBRI
//1. Creare una const definendo il valore del searchInput e convertendolo in minuscolo
//2. Creare una const definendo i libri filtrati e applicare filter a tutti i prodotti e fare confronta il titolo in minusolo
//3. Chiamare la funzione di render e mettere come paraamentro i libri filtrati
//4. A Funzione finita, chiamare la fetch nuovamente per recuperare i dati
function searchBook() {
    const searchValue = searchInput.value.toLowerCase()

    const filteredBooks = allBooks.filter((book) => {
        return book.title.toLowerCase().includes(searchValue)
    })
    renderBooks(filteredBooks)
}

recuperaDati()







//--------------------------------------------------------//
//--------------------------------------------------------//
//--------------------------------------------------------//


//FUNZIONE RECUPERA DATI DAL END PONIT CON LA FETCH
// function recuperaDati(){
//     return fetch(booksList)
//         .then(response => response.json())
//         .then(books =>{
//             console.log(books);
//             return books
//         })
//         .catch(err => console.log(err))
//     }


//FUNZIONE CHE VISUALIZZA A SCHERMO I LIBRI CON IL forEach
// function renderBooks(books){
//     let resultsBook = document.getElementById("booksResults")
//     resultsBook.classList.add("row")
//     resultsBook.innerHTML = ""


//    books.forEach(book => {
//         const card = document.createElement("div")
//         card.classList.add("card", "col-6", "col-md-3")

//         const img = document.createElement("img")
//         card.classList.add("img-fluid")
//         img.src = book.img

//         const cardBody = document.createElement("div")
//         cardBody.classList.add("card-body")

//         const cardTitle = document.createElement("h5")
//         cardTitle.classList.add("card-title", "text-truncate")
//         cardTitle.innerText = book.title

//         const genre = document.createElement("p")
//         genre.classList.add("card-text")
//         genre.innerText = book.category

//         const price = document.createElement("p")
//         price.classList.add("card-text")
//         price.innerHTML = book.price

//         const addToCart = document.createElement("button")
//         addToCart.classList.add("btn", "btn-success")
//         addToCart.innerText = "Add to Cart"

//         const hide = document.createElement("button")
//         hide.classList.add("btn", "btn-warning")
//         hide.innerText = "Hide"

//         cardBody.append(cardTitle, genre, price, addToCart, hide)
//         card.append(img, cardBody)
//         resultsBook.append(card)
//     })
// }

//CHIAMO LA FUNZIONE DELLA FECTH E CONCATENO LA FUNZIONE DI RENDER 
// recuperaDati()
//     .then(books => renderBooks(books))
//     .catch(err => console.log(err))




//FUNZIONE CHE AGGIORNA IL CARRELLO
// function updateCart(){
//     const cartContainer = document.getElementById("shoppingBook")
//     cartContainer.innerHTML = ""

//     cart.forEach((book) => {
//         const cartItem = document.createElement("li")
//         cartItem.classList.add("cart-item")
//         cartItem.innerText = "Title: " + book.title + " " + "|" + " " + "Price: " + book.price

//         cartContainer.appendChild(cartItem)
//     })

    // cart.forEach((book) => {
    //     const cartItem = document.createElement("div")
    //     cartItem.classList.add("cart-item")

    //     const cartTitle = document.createElement("h5")
    //     cartTitle.innerText = book.title
    //     cartItem.appendChild(cartTitle)

    //     const cartPrice = document.createElement("p")
    //     cartPrice.innerText = "€ " + book.price
    //     cartItem.appendChild(cartPrice)

    //     cartContainer.appendChild(cartItem)
    // });
// }
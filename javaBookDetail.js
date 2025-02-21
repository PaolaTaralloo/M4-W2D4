const bookBox = document.getElementById("bookBox")

const bookEndpoint = "https://striveschool-api.herokuapp.com/books"


function getBook() {
    const query = window.location.search
    const params = new URLSearchParams(query)
    const bookId = params.get('bookId')

    fetch (bookEndpoint + "/" + bookId)
        .then(res => res.json())
        .then(data => console.log(data))

        .catch((err) => console.log(err))
}

getBook()
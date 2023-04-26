async function getToken() {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", 
        {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjI0YzMzYjE1MjAwMTQ3NjE3OWEiLCJpYXQiOjE2ODE3MzY4MjIsImV4cCI6MTY4Mjk0NjQyMn0.mUapuxMbdtuyrZx-onFCQmLaZp-vXsqwdMDrb1pOgMY"
            }
        });
        const data = await response.json();

        // prodottiAggiunti = data
        // cardProdact(prodottiAggiunti)
        setTimeout(() =>{
            document.querySelector('.spinner-container').classList.add("d-none")
            cardProdact(data);
            }, 1000);
            console.log("vedi prodottodata", data);
    } 
    catch (error) {
        console.log('Errore nel recupero dei prodotti: ', error);
    }
}


getToken();

let prodottiAggiunti = null
function cardProdact(prodottiAggiunti) {
    let container = document.getElementById('prodotti')
    prodottiAggiunti.forEach((element) => {
        let col = document.createElement('div')
        col.classList.add("col")
        col.innerHTML = `
        <div class="card shadow-sm">
            <img src="${element.imageUrl}" class="img-fluid object-fit-fill img-libro" alt="foto-libro"/>
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
            </div>
            <ul class="list-group list-group-light list-group-small">
                <li class="list-group-item px-4 asin">ID: ${element._id}</li>
                <li class="list-group-item px-4 prezzo d-flex justify-content-between">€ ${element.price} 
                <i class="heart fa-heart fa-regular "></i>
                </li>
                <li class="list-group-item px-4 category"> ${element.description}</li>
            </ul>
            <div class="card-body btn-group">
            <button onclick="addCarrello(event)" class="btn btn-sm btn-outline-secondary btn-carrello">Aggiungi al carrello </button>
            <button onclick="discoverMore('${element._id}')" class="btn btn-sm btn-outline-secondary btn-scheda">Scheda prodotto</button>
            </div>
        </div>`

        container.appendChild(col)
        
    });
}

function login() {
    window.location.href = 'backend.html?aggiungi-prodotto'
}

function discoverMore(elem) {
    window.location.href = `prodotto.html?id=${elem}`
}


async function getToken() {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjI0YzMzYjE1MjAwMTQ3NjE3OWEiLCJpYXQiOjE2ODM4MTc4OTQsImV4cCI6MTY4NTAyNzQ5NH0.vd86q1eBCIgAuNwqlfZjtgXNH_evWAPzU5j6vSqvQG4"
                }
            });
        const data = await response.json();

        // prodottiAggiunti = data
        // cardProdact(prodottiAggiunti)
        setTimeout(() => {
            document.querySelector('.spinner-container').classList.add("d-none")
            cardProdact(data);
        }, 20);
        console.log("vedi prodottodata", data);
    }
    catch (error) {
        console.log('Errore nel recupero dei prodotti: ', error);
    }
}


getToken();

function cardProdact(prodottiAggiunti) {
    let container = document.getElementById('prodotti');
    container.innerHTML = '';

    prodottiAggiunti.forEach((element) => {
        const truncatedDescriptions = element.description.length > 100 ? element.description.substring(0, 97) + '...' : element.description;
        let col = document.createElement('div');
        col.classList.add("col");
        col.innerHTML = `
        <div class="card shadow-sm">
            <img src="${element.imageUrl}" onclick="discoverMore('${element._id}')" class="card-img-top img-libro p-1"  alt="foto-libro"/>
            <div class="card-body">
                <h4 class="card-title nome">${element.name}</h4>
            </div>
            <ul class="list-group list-group-light list-group-small">
                <li class="list-group-item px-4 asin d-none">ID: ${element._id}</li>
                <li class="list-group-item px-4 prezzo d-flex justify-content-between"><strong>€ ${element.price},00 </strong>
                <i class="heart fa-heart fa-regular "></i>
                </li>
                <li class="list-group-item px-4 category"> ${truncatedDescriptions}</li>
            </ul>
            <div class="card-body btn-group">
            <button onclick="addCarrello(event)" class="btn btn-sm btn-outline-secondary btn-carrello">Aggiungi al carrello </button>
            <button onclick="discoverMore('${element._id}')" class="btn btn-sm btn-outline-secondary btn-scheda">Scheda prodotto</button>
            </div>
        </div>`;

        container.appendChild(col);
    });
}



function login() {
    window.location.href = 'backend.html?aggiungi-prodotto'
}

function discoverMore(elem) {
    window.location.href = `prodotto.html?id=${elem}`
}


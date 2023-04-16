const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`
const apiKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjI0YzMzYjE1MjAwMTQ3NjE3OWEiLCJpYXQiOjE2ODEzMjMzOTIsImV4cCI6MTY4MjUzMjk5Mn0.C2DTAofGOHlD43flBnMxKcXHR1Z99cqPLMFyteE7oXA`

const form = document.getElementById("user-form")

const nameInput = document.getElementById("name")
const descriptionInput = document.getElementById("description")
const brandInput = document.getElementById("brand")
const imageUrlInput = document.getElementById("image-url")
const priceInput = document.getElementById("price")

// const createdAt = Date.now().getTime() GENERA L'ORA DI CREAZIONE
// const updatedAt = Date.now().getTime()


form.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const product = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageUrlInput.value,
        price: priceInput.value
    }
    try {
        if(product._id){
            const response = await fetch(`${apiUrl}${product._id}`, {
                method: 'PATCH',
                body: JSON.stringify(product),
                headers: new Headers ({
                    'Content-type': 'application/json; charset=UTF-8'
                })
            })
            if (response.ok) {
                window.location.href = 'formAggiunta.html?status=edit-ok'
            } else {
                alert('Errore durante la modifica dell\'prodotto')
            }
        } else {
            const response = await fetch(apiUrl, {
                method : 'POST',
                body : JSON.stringify(product),
                headers : new Headers ({
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-type" : 'application/json; charset=UTF-8'
                })
            })
            window.location.href = 'backend.html?status=aggiunta-prodotto'
        }
    } catch (error) {
        console.log(error);
    }
    })

async function getToken () {
    try{
        const response = await fetch (apiUrl, {
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
    })
    const data = await response.json()
    tableBody(data)
    }
    catch (error){
        console.log('Errore nel recupero del prodotto:', error);
    }
}

getToken()

//creazione tabella prodotti
function tableBody(product) {
    const tableProd = document.getElementById('table-body');
    tableProd .innerHTML = '';
    product.forEach((element) => {
        const row = `
        <tr>
            <td id="id-product" class="td-body">${element._id}</td>
            <td class="td-body">${element.name}</td>
            <td class="td-body">${element.description}</td>
            <td class="td-body">${element.brand}</td>
            <td class="td-body">${element.imageUrl}</td>
            <td class="td-body">${element.price}</td>
            <td class="td-body">${element.userId}</td>
            <td class="td-body">${element.createdAt}</td>
            <td class="td-body">${element.updetedAt}</td>
            <td class="td-body">
                <button class="btn btn-danger btn-xs" onclick="deleteProduct('${element._id}')">Elimina</button>
                <button class="btn btn-dark btn-xs" onclick="getProductData('${element._id}')">Modifica</button>
            </td>
        </tr>
        `
        tableProd.innerHTML += row
    });
    
}

async function deleteProduct(deleteProductId) {
    if (confirm('Sei siuro di voler eliminare questo Prodotto?')) {
    try {
        await fetch(`${apiUrl}${deleteProductId}`, { 
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                // "Content-type" : 'application/json; charset=UTF-8'
                },
            method: 'DELETE'} );
        window.location.href = 'backend.html?status=delete-ok'
    } catch (error) {
        console.log('Errore durante cancellazione di questo Prodotto: ', error);
    }
    }
}



function titoloPage (titolo) {
    const titlePage = document.getElementById(`page-title`)
    titlePage.textContent = titolo ? `Modifica Prodotto` : `Crea Prodotto`
}

function goBack() {
    window.location.href = 'index.html'
}


//esempio alessandro
async function getProductData(idProdotto) {
    const idProductNuovo = document.getElementById('id-product')
    // idProductNuovo.value = 
    try {
        const response = await fetch(`${apiUrl}${idProdotto}`,{
            headers: {
                "Authorization" : `Bearer ${apiKey}`
        }
    })
    const product = await response.json() 
        nameInput.value = product.name
        descriptionInput.value = product.description
        brandInput.value = product.brand
        imageUrlInput.value  = product.imageUrl
        priceInput.value  = product.price
    }catch (error) {
        console.log('Errore nel recupero degli prodotti: ', error);
    }
}

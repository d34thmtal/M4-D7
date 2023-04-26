const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`
const apiKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjI0YzMzYjE1MjAwMTQ3NjE3OWEiLCJpYXQiOjE2ODE3MzY4MjIsImV4cCI6MTY4Mjk0NjQyMn0.mUapuxMbdtuyrZx-onFCQmLaZp-vXsqwdMDrb1pOgMY`

const form = document.getElementById("user-form")
const idProductNuovo = document.getElementById('prodotto-id')
const nameInput = document.getElementById("name")
const descriptionInput = document.getElementById("description")
const brandInput = document.getElementById("brand")
const imageUrlInput = document.getElementById("image-url")
const priceInput = document.getElementById("price")

// form.addEventListener('submit', async (event) =>{
//     event.preventDefault();
//     const product = {
//         name: nameInput.value,
//         description: descriptionInput.value,
//         brand: brandInput.value,
//         imageUrl: imageUrlInput.value,
//         price: priceInput.value
//     }

//     try {
//         if(idProductNuovo.value === ""){
//             const risposta = await fetch(`${apiUrl}${idProductNuovo.value}`, {
//                 method: 'PUT',
//                 body: JSON.stringify(product),
//                 headers: new Headers ({
//                     "Authorization": `Bearer ${apiKey}`,
//                     'Content-type': 'application/json; charset=UTF-8'
//                 })
//             })
//             if (risposta.ok) {
//                 window.location.href = `backend.html?status=edit-ok`
//             } else {
//                 alert('Errore durante la modifica dell\'prodotto')
//             }
//         } else {
//             const response = await fetch(apiUrl, {
//                 method : 'POST',
//                 body : JSON.stringify(product),
//                 headers : new Headers ({
//                     "Authorization": `Bearer ${apiKey}`,
//                     "Content-type" : 'application/json; charset=UTF-8'
//                 })
//             })
//             window.location.href = `backend.html?status=aggiunta-prodotto`
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })



form.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const isFormValid = handleFormValidation()
    if(!isFormValid) return false

    // checktxt()
    const product = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageUrlInput.value,
        price: priceInput.value
    }

    try {
        if(idProductNuovo.value === "" ){
            const response = await fetch(apiUrl, {
                method : 'POST',
                body : JSON.stringify(product),
                headers : new Headers ({
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-type" : 'application/json; charset=UTF-8'
                })
            })
            window.location.href = 'backend.html?status=aggiunta-prodotto'
        } else  {
            const risposta = await fetch(`${apiUrl}${idProductNuovo.value}`, {
                method: 'PUT',
                body: JSON.stringify(product),
                headers: new Headers ({
                    "Authorization": `Bearer ${apiKey}`,
                    'Content-type': 'application/json; charset=UTF-8'
                })
            })
            if (risposta.ok) {
                window.location.href = 'backend.html?status=edit-ok'
            } else {
                alert('Errore durante la modifica dell\'prodotto')
            }
        } 
    } catch (error) {
        console.log(error);
    }
    checktxt()
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

function tableBody(product) {
    const tableProd = document.getElementById('table-body');
    tableProd .innerHTML = '';
    product.forEach((element) => {
        const row = `
        <tr>
            <td id="prodotto-id" class="td-body">${element._id}</td>
            <td class="td-body w-25">${element.name}</td>
            <td class="td-body w-25">${element.description}</td>
            <td class="td-body w-25">${element.brand}</td>
            <td class="td-body w-25">${element.imageUrl}</td>
            <td class="td-body w-25">${element.price}</td>
            <td class="td-body w-25">${element.userId}</td>
            <td class="td-body w-25">${element.createdAt}</td>
            <td class="td-body w-25">${element.updatedAt}</td>
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
                "Content-type" : 'application/json; charset=UTF-8'
                },
            method: 'DELETE'} );
        window.location.href = 'backend.html?status=delete-ok'
        } catch (error) {
            console.log('Errore durante cancellazione di questo Prodotto: ', error);
        }
    }
}

// function titoloPage (titolo) {
//     const titlePage = document.getElementById(`page-title`)
//     titlePage.textContent = titolo ? `Modifica Prodotto` : `Crea Prodotto`
// }

function titoloPage(titolo) {
    const titlePage = document.getElementById(`page-title`);
    const newTitle = titolo ? `Modifica Prodotto` : `Nuovo Prodotto`;
    titlePage.textContent = newTitle;
    history.pushState(null, newTitle, `?action=${newTitle}`);
}


function goBack() {
    window.location.href = 'index.html'
}

async function getProductData(idProdotto) {
    try {
        const response = await fetch(`${apiUrl}${idProdotto}`,{
            headers: {
                "Authorization" : `Bearer ${apiKey}`
        }
    })
    const product = await response.json()
        idProductNuovo.value = product._id
        nameInput.value = product.name
        descriptionInput.value = product.description
        brandInput.value = product.brand
        imageUrlInput.value  = product.imageUrl
        priceInput.value  = product.price
    }catch (error) {
        console.log('Errore nel recupero degli prodotti: ', error);
    }
    // buildPageTitle(nameInput)
    titoloPage (idProdotto)
    }


// function buildPageTitle(nameInput) {
//     const pageTitle = document.getElementById('page-title')
//     pageTitle.textContent = nameInput ? 'Modifica utente' : 'Crea nuovo utente'
// }

//autenticazione 
// async function rinnovoToken() {

//     try {
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             endpoint: `https://striveschool-api.herokuapp.com/api/account/login`,
//             requestbody:
//             {
//             "username": `max.cossu@hotmail.com`,
//             "password": 'Massimo85!'
//             }
//         })
//     }  
//     catch (error) {
//         console.log('Errore nel recupero della password ', error);
//     } 
// }

// windows.onload = function () {
    
// }


// function checktxt() {

//     if((nameInput.value == "") || (nameInput.value == "undefined") || (descriptionInput.value == "") || (descriptionInput.value == "undefined")  || (brandInput.value == "") || (brandInput.value == "undefined")) {


//         // const pAllert = document.createElement("p")
//         // const allertContent = document.createTextNode("Inserisci il testo")
//         // pAllert.appendChild(allertContent)
        
//         // alert("Inserisci il testo");
//         document.nameInput.focus()
//         // document.descriptionInput.focus()
//         // document.brandInput.focus()
//         return false
//     }
    
// }

function validateForm() {
    const errors = {}

    const nameValue = document.getElementById('name').value
    const descriptionValue = document.getElementById('description').value
    const brandValue = document.getElementById('brand').value
    const imageUrlValue = document.getElementById('image-url').value
    const priceValue = document.getElementById('price').value

    if (!nameValue) errors.name = "ERRORE, devi inserire il nome"
    else errors.name = ""
    if (!descriptionValue) errors.description = "ERRORE, devi inserire una descrizione"
    else errors.description = ""
    if (!brandValue) errors.brand = "ERRORE, devi inserire la marca"
    else errors.brand = ""

    if (!imageUrlValue) errors.url = "ERRORE, devi inserire una Url"
    else if (!imageUrlValue.startsWith("http")) errors.url = "ERRORE, devi inserire una Url"
    else errors.url = ""
    if (isNaN(priceValue)) errors.price = "ERRORE, devi inserire il prezzo in cifre"
    else if (!priceValue) errors.price = "ERRORE, devi inserire il prezzo"
    else errors.price = ""

    return {
        errors,
        isValid: Object.values(errors).every(value => value === "")
    }
}

function handleFormValidation() {
    const validation = validateForm()
    let isValid = true;

    if (!validation.isValid) {
        for (const key in validation.errors){

        const elementError = document.getElementById(`${key}-alert`)
        elementError.textContent = '';
        elementError.textContent = validation.errors[key];
        }
        isValid = false;
    }
    return isValid
}


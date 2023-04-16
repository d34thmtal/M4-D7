# ESERCIZI

### E-COMMERCE FRONT PAGE & BACK OFFICE

Il tuo obbiettivo è di creare un finto e-commerce con le funzionalità di gestione dei prodotti.

Le features da implementare sono:

– Una frontpage, dove si vedono tutti i prodotti
– A backoffice da cui aggiungere nuovi prodotti

Nel backoffice, implementa un form per aggiungere un nuovo prodotto al database. Il prodotto deve essere strutturato così:

“`jsx
{
“_id”: “5d318e1a8541744830bef139”, // SERVER GENERATED
“name”: “3310 cellphone”, // REQUIRED
“description”: “An unforgettable icon.”, // REQUIRED
“brand”: “Nokia”, // REQUIRED
“imageUrl”: “https://bit.ly/3CExjRa”, // REQUIRED
“price”: 100, // REQUIRED
“userId”: “admin”, // SERVER GENERATED
“createdAt”: “2021-09-19T09:32:10.535Z”, // SERVER GENERATED
“updatedAt”: “2021-09-19T09:32:10.535Z”, // SERVER GENERATED
“__v”: 0 // SERVER GENERATED
}
“`

I campi che dicono “REQUIRED” sono obbligatori. Quelli “SERVER GENERATED”, invece, non serve che siano inviati all’API.

L’endpoint è:

`[https://striveschool-api.herokuapp.com/api/product/](https://striveschool-api.herokuapp.com/api/product/)`

Sia per GET che per POST.

🛑 **IMPORTANTE** 🛑

OGNI CHIAMATA DEVE ESSERE AUTENTICATE.

Ogni richiesta a questo API deve includere un token per ottenere l’accesso.

Puoi ottenere il token qui: [https://strive.school/studentlogin](https://strive.school/studentlogin)

Esempio:

“`jsx
fetch(‘https://striveschool-api.herokuapp.com/api/product/’, {
headers: {
Authorization: ‘Bearer XXXXXXXXXXXXXXXXX’
}
})
“`

Dove “XXXXXXXXXXXXXXXXX“ deve essere sostituito dal token preso dalla pagina menzionata in precedenza.

Il token dura 14 giorni, se te ne serve uno nuovo, puoi ottenerlo con la seguente richiesta:

“`jsx
method: “POST”
endpoint: “https://striveschool-api.herokuapp.com/api/account/login”
request body:
{
“username”: // the username you registered with,
“password”: // the password you registered with
}
“`

Puoi iniziare con il template allegato.

### 🔴 CENTRO RISOLUZIONE PROBLEMI / FAQ:

Imparare a leggere gli errori è fondamentale**! ✨**

**Ricevo solo un array vuoto, perché?**

L’API ti invierà solo i prodotti che TU hai aggiunti. Prova a creare qualcosa con POST e controlla di nuovo.

**Ricevo un errore 500, come posso risolvere?**

Controlla nella network tab del tuo inspector per vedere l’errore specifico.
Solitamente

1. Ti manca un field nel corpo
2. Hai una “duplicate key”, cioè il nome del prodotto esiste già
3. Hai inviato il tipo sbagliato di dati (una stringa invece di un numero o simili)
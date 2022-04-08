let nome = document.getElementById("firstName")
let cognome = document.getElementById("lastName")
let indirizzo = document.getElementById("address")
let citta = document.getElementById("city")

async function main() {

    var datiOggettiCestino = localStorage.getItem("carrello");
    const carrelloProdottiJs = JSON.parse(datiOggettiCestino) || []
    const itemList = [] //array vuoto per inserire i risultati

    /* VISUALIZZAZIONE articoli del carrello con relativi dati */

    for (index in carrelloProdottiJs) {
        const oggettiCarrello = carrelloProdottiJs[index]
        const risposta = await fetch('http://localhost:3000/api/products/' + oggettiCarrello.id)
        const item = await risposta.json();

        itemList.push(item)
        const contenitorePrimo = document.querySelector("#infoCarrello").content.cloneNode(true)
        contenitorePrimo.querySelector(".cart__item").dataset.id = oggettiCarrello.id
        contenitorePrimo.querySelector(".cart__item").dataset.color = oggettiCarrello.colore
        contenitorePrimo.querySelector(".productImage").src = item.imageUrl
        contenitorePrimo.querySelector(".cart__product__name").innerText = item.name
        contenitorePrimo.querySelector(".cart__product__color").innerText = oggettiCarrello.colore
        contenitorePrimo.querySelector(".cart__product__price").innerText = item.price + "€"
        contenitorePrimo.querySelector(".itemQuantity").value = oggettiCarrello.quantita

        const modificaQ = contenitorePrimo.querySelector(".itemQuantity")
        const daEliminare = contenitorePrimo.querySelector("#cart__item")
        const deleteItemButton = contenitorePrimo.querySelector("#deleteItem")

        /*INSERIMENTO del CAMBIO quantità prodotto*/

        modificaQ.addEventListener("change", function () {
            const quantityMOD = parseInt(modificaQ.value)
            oggettiCarrello.quantita = quantityMOD
            let carrello = JSON.stringify(carrelloProdottiJs);
            localStorage.setItem("carrello", carrello);

            calcolaTotale(carrelloProdottiJs, itemList)

        })

        /*ELIMINAZIONE prodotto del carrello*/

        deleteItemButton.addEventListener("click", function () {
            /* "indexOf" restituisce un valore numerico che rappresenta la
             posizione dell’elemento nella stringa. Se non trova il valore restituisce -1. */
            const itemIndex = carrelloProdottiJs.indexOf(oggettiCarrello)
            carrelloProdottiJs.splice(itemIndex, 1);
            daEliminare.remove()

            let carrello = JSON.stringify(carrelloProdottiJs);
            localStorage.setItem("carrello", carrello);

            calcolaTotale(carrelloProdottiJs, itemList);

        })

        const baliseRec = document.getElementById("cart__items") //registra modifiche in balise globale <section id="cart__items">
        baliseRec.appendChild(contenitorePrimo)
    }

    calcolaTotale(carrelloProdottiJs, itemList)
    controlloNome()

    /* SUBMIT del formulario con funzione */

    document.getElementById("formulario").addEventListener('submit', async function (event) {
        event.preventDefault()
        if (nome.dataset.error || cognome.dataset.error || indirizzo.dataset.error || citta.dataset.error) {
            alert('Merci de bien remplir le formulaire')
            return
        }

        const products = carrelloProdottiJs.reduce(function (idList, oggettiCarrello) {
            for (let i = 0; i < oggettiCarrello.quantita; i++) {
                idList.push(oggettiCarrello.id)
            }
            return idList
        }, [])

        if (products.length === 0) {
            alert('Votre panier est vide')
            return
        }

        payload = { // payload= dati da inviare
            contact: {
                firstName: nome.value,
                lastName: cognome.value,
                address: indirizzo.value,
                city: citta.value,
                email: document.getElementById("email").value
            },
            products
        }

        //console.table(payload); //".table" mette in  tabella il risultato
        const rispostaServer = await fetch('http://localhost:3000/api/products/order', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const commande = await rispostaServer.json();

        /*INVIO ID comanda */

        var idNumber = commande.orderId
        location.replace('./confirmation.html?idOrder=' + idNumber)
    })

}

/* FUNZIONE calcolo del TOTALE */

function calcolaTotale(cartProduits, listaElementi) {
    let totalQuantity = 0
    let totalPrice = 0

    for (cartItems of cartProduits) {
        const item = listaElementi.find(x => x._id === cartItems.id)

        totalQuantity += cartItems.quantita

        totalPrice += (item.price * cartItems.quantita)

    }
    document.getElementById("totalQuantity").innerText = totalQuantity
    document.getElementById("totalPrice").innerText = totalPrice

}

/* FUNZIONE controllo campi tabella */
function controlloNome() {

    //console.log(nome);
    var var1 = /^[A-Za-z -.àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{2,30}$/;
    var var2 = /^[A-Za-z 0-9 "',-.àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{6,30}$/;

    //NOME
    nome.addEventListener('input', () => {

        if (var1.test(nome.value) === false) {
            document.getElementById("firstNameErrorMsg").innerText = "inserire un NOME valido, senza numeri o caratteri speciali, dai 2 ai 30 caratteri.";
            nome.dataset.error = true
        } else {
            document.getElementById("firstNameErrorMsg").innerText= ""
            delete nome.dataset.error
        }
    });

    //COGNOME
    cognome.addEventListener('input', () => {

        if (var1.test(cognome.value) === false) {
            document.getElementById("lastNameErrorMsg").innerText = "inserire un COGNOME valido, senza numeri o caratteri speciali, dai 2 ai 30 caratteri.";
            cognome.dataset.error = true
        } else {
            document.getElementById("lastNameErrorMsg").innerText = ""
            delete cognome.dataset.error
        }
    });

    //INDIRIZZO
    indirizzo.addEventListener('input', () => {

        if (var2.test(indirizzo.value) === false) {
            document.getElementById("addressErrorMsg").innerText = "inserire un INDIRIZZO valido.";
            indirizzo.dataset.error = true
        } else {
            document.getElementById("addressErrorMsg").innerText = ""
            delete indirizzo.dataset.error
        }
    });

    //CITTà
    citta.addEventListener('input', () => {

        if (var1.test(citta.value) === false) {
            document.getElementById("cityErrorMsg").innerText = "inserire una CITTÀ valido, senza numeri o caratteri speciali, dai 2 ai 30 caratteri.";
            citta.dataset.error = true
        } else {
            document.getElementById("cityErrorMsg").innerText = ""
            delete citta.dataset.error
        }
    });

}

main(

)
let nome = document.getElementById("firstName")
let cognome = document.getElementById("lastName")
let indirizzo = document.getElementById("address")
let citta = document.getElementById("city")

async function main() {

    var datiOggettiCestino = localStorage.getItem("carrello");
    //console.log(datiOggettiCestino);
    const carrelloProdottiJs = JSON.parse(datiOggettiCestino)
    //console.log(carrelloProdottiJs);

    const itemList = []

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

        //CHANGE quantity produits

        modificaQ.addEventListener("change", function () {
            const quantityMOD = parseInt(modificaQ.value)
            oggettiCarrello.quantita = quantityMOD
            let carrello = JSON.stringify(carrelloProdottiJs);
            localStorage.setItem("carrello", carrello);

            calcolaTotale(carrelloProdottiJs, itemList)

        })


        //DELETE products

        deleteItemButton.addEventListener("click", function () {
            /* "indexOf" restituisce un valore numerico che rappresenta la
             posizione dell’elemento nella stringa. Se non trova il valore restituisce -1. */
            const itemIndex = carrelloProdottiJs.indexOf(oggettiCarrello)
            //console.log(itemIndex);
            carrelloProdottiJs.splice(itemIndex, 1);
            daEliminare.remove()

            let carrello = JSON.stringify(carrelloProdottiJs);
            localStorage.setItem("carrello", carrello);

            calcolaTotale(carrelloProdottiJs, itemList);

        })

        //registra modifiche in balise globale <section id="cart__items">
        const baliseRec = document.getElementById("cart__items")
        baliseRec.appendChild(contenitorePrimo)
    }


    calcolaTotale(carrelloProdottiJs, itemList)
    controlloNome()

    /* SUBMIT del formulario con funzione*/

    document.getElementById("formulario").addEventListener('submit', async function (event) {
        event.preventDefault()
        /* payload= dati da inviare*/
        payload = {
            contact: {
                firstName: nome.value,
                lastName: cognome.value,
                address: indirizzo.value,
                city: citta.value,
                email: document.getElementById("email").value
            },
            products: carrelloProdottiJs.reduce(function (idList, oggettiCarrello) {
                for (let i = 0; i < oggettiCarrello.quantita; i++) {
                    idList.push(oggettiCarrello.id)
                }
                return idList
            }, [])
        }

        console.table(payload);//".table" mette in  tabella il risultato
        const rispostaServer = await fetch('http://localhost:3000/api/products/order', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const commande = await rispostaServer.json();
        console.log(commande);
        console.log(commande.orderId);//id della comanda

        /*INVIO ID comanda */
        localStorage.setItem("idComanda", commande.orderId);

        var idNumber = commande.orderId

        const commandeButton = document.getElementById("order")  
        commandeButton.addEventListener('click', () => {
        
            location.replace('http://localhost:3000/api/products/order/'+idNumber)
            })
    
    

    })
    
}


/*FUNZIONE calcolaTotale function*/

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


/*FUNZIONE controllo campi tabella*/
function controlloNome() {

    //console.log(nome);
    var var1 = /^[A-Za-z -.àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{2,30}$/;
    var var2 = /^[A-Za-z 0-9 "',-.àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{6,30}$/;

    //NOME
    nome.addEventListener('input', () => {

        if (var1.test(nome.value) === false) {
            console.log(nome.value);
            //console.log('errore input');
            console.log(var1.test(nome))
            document.getElementById("firstNameErrorMsg").innerHTML = "inserire un NOME valido, senza numeri o caratteri speciali, dai 2 ai 30 caratteri.";

        } else {
            document.getElementById("firstNameErrorMsg").innerHTML = ""
        }
    });

    //COGNOME
    cognome.addEventListener('input', () => {

        if (var1.test(cognome.value) === false) {
            console.log(cognome.value);
            //console.log('errore input');
            console.log(var1.test(cognome))
            document.getElementById("lastNameErrorMsg").innerHTML = "inserire un COGNOME valido, senza numeri o caratteri speciali, dai 2 ai 30 caratteri.";

        } else {
            document.getElementById("lastNameErrorMsg").innerHTML = ""
        }
    });

    //INDIRIZZO
    indirizzo.addEventListener('input', () => {

        if (var2.test(indirizzo.value) === false) {
            console.log(indirizzo.value);
            //console.log('errore input');
            console.log(var2.test(indirizzo))
            document.getElementById("addressErrorMsg").innerHTML = "inserire un INDIRIZZO valido.";

        } else {
            document.getElementById("addressErrorMsg").innerHTML = ""
        }
    });

    //CITTà
    citta.addEventListener('input', () => {

        if (var1.test(citta.value) === false) {
            console.log(citta.value);
            //console.log('errore input');
            console.log(var1.test(citta))
            document.getElementById("cityErrorMsg").innerHTML = "inserire una CITTÀ valido, senza numeri o caratteri speciali, dai 2 ai 30 caratteri.";

        } else {
            document.getElementById("cityErrorMsg").innerHTML = ""
        }
    });



}


main(


)
async function main() {
    /* RECUPERO ID scheda prodotto con aggiunta a fine Url */
    var queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let id = params.get("id");
    const response = await fetch('http://localhost:3000/api/products/' + id)
    const item = await response.json()

    /* RECUPERO prezzo, nome articolo e descrizione */

    document.querySelector("#price").innerText = item.price;
    document.querySelector("#title").innerText = item.name;
    document.querySelector("#description").innerText = item.description;

    /* RECUPERO immagine prodotto */

    const fotografia = document.createElement("img");
    let baliseParent = document.getElementById("fotoCanape");
    fotografia.src = item.imageUrl;
    fotografia.alt = item.altTxt;
    baliseParent.appendChild(fotografia);

    /* DEFINIZIONE valore colori come opzione in select */

    for (let colori of item.colors) {
        const option = document.createElement("option")
        option.innerText = colori
        const selectColors = document.getElementById("colors")
        selectColors.appendChild(option)
    }

    /* CORREZIONE errore browser */

    if (typeof browser === "undefined") {
        var browser = chrome;
    }

    /* CORREZIONE errori nella selezione */

    const pulsante = document.getElementById("addToCart")
    pulsante.addEventListener("click", function () {
        if (quantity.value <= 0) {//condizione "QUANTITà"
            alert("seleziona una quantità superiore a 0")
            return
        }

        var colors = document.getElementById("colors") 
        var coloreSelezionato = colors.options[colors.selectedIndex].value;

        if (coloreSelezionato === "") {//condizione "COLORE"
            alert('séléctionnez une couleur');
            return
        }

        /*DEFINIZIONE valori Array, (funzione per non ripetere la stringa dello stesso prodotto dello 
        stesso colore quando aggiungo più pezzi al carrello) */

        const cartItems = JSON.parse(localStorage.getItem("carrello")) || []
        let cartItem = cartItems.find(function (_cartItem) {
            return item._id === _cartItem.id && coloreSelezionato === _cartItem.colore;
        })
        if (cartItem) {
            cartItem.quantita += parseInt(quantity.value);
        } else {
            cartItem = {
                id: item._id,
                colore: coloreSelezionato,
                quantita: parseInt(quantity.value)
            }
            cartItems.push(cartItem)
        }

        /*TRASFORMAZIONE oggetto JS in Json*/

        let carrello = JSON.stringify(cartItems);
        
        /*INVIO carrello a LocalStorage  */

        localStorage.setItem("carrello", carrello);
    }
    )
}

main()





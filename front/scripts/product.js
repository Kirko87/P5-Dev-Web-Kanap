async function main() {
    var queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let id = params.get("id");
    const response = await fetch('http://localhost:3000/api/products/' + id)
    const item = await response.json()

    /* recupero prezzo, nome articolo e descrizione*/
    //console.log(item)

    document.querySelector("#price").innerText = item.price;
    document.querySelector("#title").innerText = item.name;
    document.querySelector("#description").innerText = item.description;

    /* recupero immagine prodotto*/

    const fotografia = document.createElement("img");
    let baliseParent = document.getElementById("fotoCanape");
    fotografia.src = item.imageUrl;
    fotografia.alt = item.altTxt;
    baliseParent.appendChild(fotografia);

    /* rendere valore colori come opzione in select*/

    for (let colori of item.colors) {
        const option = document.createElement("option")
        option.innerText = colori
        const selectColors = document.getElementById("colors")
        selectColors.appendChild(option)
    }

    /* errore browser*/
    if (typeof browser === "undefined") {
        var browser = chrome;
    }

    /*recupero dei valori in localStorage*/
    const pulsante = document.getElementById("addToCart")
    pulsante.addEventListener("click", function () {
        if (quantity.value <= 0) {
            alert("seleziona una quantità superiore a 0")
            return
        }

        /*     if (coloreSelezionato === ""){
           alert("seleziona un colore")
           return
           }
       */

        /* recupero valori colore del select */
        var colors = document.getElementById("colors")
        var coloreSelezionato = colors.options[colors.selectedIndex].value;

        //definisco valori Array
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

        //trasforma oggetto JS in Json

        let carrello = JSON.stringify(cartItems);
        // console.log(carrello);

        localStorage.setItem("carrello", carrello);
        //console.log(coloreSelezionato,item._id,quantity.value) //verifica valori inviati
    }
    )

}


main()





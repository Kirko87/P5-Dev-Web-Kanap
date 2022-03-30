async function main() {
    var queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let id = params.get("id");
    const response = await fetch('http://localhost:3000/api/products/' + id)
    const item = await response.json()
    console.log(item)

    /* RECUPERO prezzo, nome articolo e descrizione*/
    
    document.querySelector("#price").innerText = item.price;
    document.querySelector("#title").innerText = item.name;
    document.querySelector("#description").innerText = item.description;

    /* RECUPERO immagine prodotto*/

    const fotografia = document.createElement("img");
    let baliseParent = document.getElementById("fotoCanape");
    fotografia.src = item.imageUrl;
    fotografia.alt = item.altTxt;
    baliseParent.appendChild(fotografia);

    /* RENDERE valore colori come opzione in select*/

    for (let colori of item.colors) {
        const option = document.createElement("option")
        option.innerText = colori
        const selectColors = document.getElementById("colors")
        selectColors.appendChild(option)
    }

    /* Evito errore browser*/
    if (typeof browser === "undefined") {
        var browser = chrome;
    }

    const pulsante = document.getElementById("addToCart")
    pulsante.addEventListener("click", function () { 
        if (quantity.value <= 0) {//Condizione QUANTITà
            alert("seleziona una quantità superiore a 0")
            return
        }

        /* RECUPERO valori colore del select */
        var colors = document.getElementById("colors")
        var coloreSelezionato = colors.options[colors.selectedIndex].value;
 
        if (coloreSelezionato === "") {//Condizione COLORE
            alert('séléctionnez une couleur');
            return
          }
          
        //DEFINISCO valori Array
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

        /*TRASFORMO oggetto JS in Json*/

        let carrello = JSON.stringify(cartItems);
        // console.log(carrello);

        localStorage.setItem("carrello", carrello);
        //console.log(coloreSelezionato,item._id,quantity.value) //verifica valori inviati
    }
    )
}


main()





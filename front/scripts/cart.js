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

        const deleteItemButton = contenitorePrimo.querySelector("#deleteItem")


        //change quantity produits


        modificaQ.addEventListener("change", function () {
            const quantityMOD = parseInt(modificaQ.value)
            oggettiCarrello.quantita = quantityMOD
            let carrello = JSON.stringify(carrelloProdottiJs);
            localStorage.setItem("carrello", carrello);

            calcolaTotale(carrelloProdottiJs, itemList)

        })


        //delete products

         deleteItemButton.addEventListener("click", function () {
                 var re = carrelloProdottiJs.splice(index, 1);
                 console.log(re);
                 let carrello = JSON.stringify(carrelloProdottiJs);
                 localStorage.setItem("carrello", carrello);

                 calcolaTotale(carrelloProdottiJs, itemList);

             })

        //registra modifiche in balise globale <section id="cart__items">
        const baliseRec = document.getElementById("cart__items")
        baliseRec.appendChild(contenitorePrimo)
    }


    calcolaTotale(carrelloProdottiJs, itemList)

}


//calcolaTotale function 


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



main(


)
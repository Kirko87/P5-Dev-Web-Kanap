async function main() {


    var datiOggettiCestino = localStorage.getItem("carrello");
    console.log(datiOggettiCestino);
    const carrelloProdottiJs = JSON.parse(datiOggettiCestino)
    console.log(carrelloProdottiJs);


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

        modificaQ.addEventListener("change", function () {
            const quantityMOD = parseInt(modificaQ.value)

            oggettiCarrello.quantita = quantityMOD

            let carrello = JSON.stringify(carrelloProdottiJs);

            localStorage.setItem("carrello", carrello);
            console.log(carrello);

            calcolaTotale(carrelloProdottiJs, itemList)

        })


        const baliseRec = document.getElementById("cart__items")
        baliseRec.appendChild(contenitorePrimo)


    }

    calcolaTotale(carrelloProdottiJs, itemList)
}

function calcolaTotale(cart, visualizza) {
    let totalQuantity = 0
    let totalPrice = 0

    for (cartItems of cart) {
        const item = visualizza.find(fff => fff._id === cartItems.id)
        totalQuantity += cartItems.quantita
        console.log(totalQuantity);
        totalPrice += (item.price * cartItems.quantita)
        console.log(totalPrice);
    }
    document.getElementById("totalQuantity").innerText = totalQuantity
    document.getElementById("totalPrice").innerText = totalPrice

}



main(


)
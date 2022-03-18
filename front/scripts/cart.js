async function main(){  
    const response=await ('http://192.168.1.16:5500/front/html/cart.html')
   

    console.log('rmknke');
     
    var datiOggettiCestino = localStorage.getItem("carrello");
    console.log(datiOggettiCestino);
    const carrelloProdottiJs = JSON.parse(datiOggettiCestino)
    console.log(carrelloProdottiJs);

    for (oggettiCarrello of carrelloProdottiJs){
    const risposta=await fetch('http://localhost:3000/api/products/'+oggettiCarrello.id)
    const item=await risposta.json();
    
    const contenitorePrimo = document.querySelector("#infoCarrello").content.cloneNode(true)
    contenitorePrimo.querySelector("#cart__item").dataset.id=oggettiCarrello.id
    contenitorePrimo.querySelector("#cart__item").dataset.color=oggettiCarrello.colore
    contenitorePrimo.querySelector(".productImage").src=item.imageUrl
    contenitorePrimo.querySelector(".cart__product__name").innerText=item.name
    contenitorePrimo.querySelector(".cart__product__color").innerText = oggettiCarrello.colore
    contenitorePrimo.querySelector(".cart__product__price").innerText = item.price +"€"
    contenitorePrimo.querySelector(".itemQuantity").value=oggettiCarrello.quantita
    
    
 
    const gatto = document.getElementById("cart__items")
        gatto.appendChild(contenitorePrimo)
 

    

    }

    
}

main (
    
 
)
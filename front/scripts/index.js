async function main(){  
    const response=await fetch('http://localhost:3000/api/products')
    const items=await response.json()
    console.log(items)
    
    /* recupero di tutte le immagini prodotti*/
   
    for (let immagini of items){
        console.log (immagini)
        const product=document.querySelector("#items-template").content.cloneNode(true)
        product.querySelector(".productName").innerText=immagini.name
        product.querySelector(".productDescription").innerText=immagini.description
        product.querySelector(".productImage").src=immagini.imageUrl
        product.querySelector(".productPrice").innerText=immagini.price+"€"
        product.querySelector(".productColor").innerText=immagini.colors
        product.querySelector(".schedaProdotto").href="./product.html?id="+immagini._id
        const section=document.getElementById("items")
        section.appendChild(product) // creo sezione product

       
        
    }

   
    
    
    
    
}

main()


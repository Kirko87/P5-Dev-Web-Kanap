/*RECUPERO id comanda e la metto in URL */

var queryString = window.location.search;
let params = new URLSearchParams(queryString);

let spanId = document.getElementById("orderId")
spanId.innerText = params.get('idOrder')

localStorage.removeItem("carrello");







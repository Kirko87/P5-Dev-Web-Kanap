/*RECUPERO id comanda e la metto in URL */

var queryString = window.location.search;
let params = new URLSearchParams(queryString);

let spanId = document.getElementById("orderId")
spanId.innerHTML = "<br><br>" + params.get('idOrder')

localStorage.removeItem("carrello");








//var recupera = localStorage.getItem("idComanda","linkId")
var queryString = window.location.search;
let params = new URLSearchParams(queryString);

//console.log(recupera);

let spanId = document.getElementById("orderId")
spanId.innerHTML = "<br><br>" + params //+"<br>" + recupera
//console.log();



localStorage.removeItem("idComanda");








async function main() {
    var queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let idNumber = params.get("id")
    const response = await fetch('http://localhost:3000/api/products/'+id)
    const item = await response.json()
    console.log(item)


    var idRecuperato = localStorage.getItem("idComanda");
    console.log(idRecuperato);
}
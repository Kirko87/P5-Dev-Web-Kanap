async function main() {
    var queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let idNumber = params.get("orderId");
    const response = await fetch('http://localhost:3000/api/products/'+idNumber)
    const item = await response.json()
    console.log(item)



}
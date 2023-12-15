const URL = 'https://dolarapi.com/'
const arrayDolares = [];
const mainDolares = document.querySelector("main#DolarCards-Container");
const montoConvertido = document.querySelector("div#MontoConvertido");

function retornarDolar(dolar) {
    return  `<section class="DolarCard">
                <div class="DolarCard-div">
                    <img src="Icon/DollarIcon.png" alt="">
                    <h3 class="DolarCard-Title">${dolar.nombre}</h3>
                    <div class="DolarPrecios">
                        <div class="Precio-Compra">
                            <p>Precio Compra</p>
                            <p>${dolar.compra}</p>
                        </div>
                        <div class="Precio-venta">
                            <p>Precio venta</p>
                            <p>${dolar.venta}</p>
                        </div>
                    </div>
                </div>
            </section>`
            
}
function listarDolares() {
    mainDolares.innerHTML = "";
    if (arrayDolares.length > 0) {
        arrayDolares.forEach((dolar) => {
            mainDolares.innerHTML += retornarDolar(dolar)
            })     
    }else{
        mainDolares.innerHTML = "no se pudieron obtener los dolares";
    }
}
function buscarDolares() {
    const URLbuscar = URL + "v1/dolares"
    fetch(URLbuscar)
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error("Se ha producido un error.")
        }
    })
    .then((datos) => {
        arrayDolares.length = 0;
        arrayDolares.push(...datos);
        listarDolares();
    })
}
buscarDolares()

function Convertir() {
    const InputConvertir = document.querySelector("input#MontoConvertir");
    montoConvertido.innerHTML = ""
    var  montoAConvertir= InputConvertir.value
    var resultado;
    if (montoAConvertir > 0) {
        montoConvertido.innerHTML = `<h2>Monto en dolar blue: Cargando...</h2>`;
        setTimeout(() => {
            resultado = montoAConvertir / arrayDolares[1].venta;
            montoConvertido.innerHTML = `<h2>Monto en dolar blue: ${resultado}</h2>`
        }, 3000)
    }
}
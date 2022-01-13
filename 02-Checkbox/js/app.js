var chkBicicleta = document.getElementById('chkBicicleta')
var chkCarro = document.getElementById('chkCarro')

document.getElementById('btnEnviar').onclick = function() {

    if (chkBicicleta.checked) {
        console.log("Você marcou 'bicicleta'");
    } else {
        console.log("Você não marcou 'bicicleta'");
    }

    if (chkCarro.checked) {
        console.log("Você escolheu 'carro'");
    } else {
        console.log("Você não escolheu 'carro'");
    }
}

document.getElementById('btnCarregar').onclick = function() {

    // A função Math.floor(x) retorna o menor número inteiro dentre 
    // o número "x".
    if (Math.floor(Math.random() * 2)) {
        chkBicicleta.checked = true
    } else {
        chkBicicleta.checked = false
    }

    if (Math.floor(Math.random() * 2)) {
        chkCarro.checked = true
    } else {
        chkCarro.checked = false
    }
}
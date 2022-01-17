// Botão Enviar
document.getElementById('btnEnviar').onclick = function () {

    // var radios = document.getElementsByName('banda-rock')

    var radios = document.querySelectorAll('input[type="radio"]')

    console.log(radios);

    for(var index = 0; radios.length; index++) {

        if(radios[index].checked) {
            console.log("Escolheu: " + radios[index].value);
        }
    }
}

// Botão Carregar 
document.getElementById('btnCarregar').onclick = function () {

    // var radios = document.getElementsByName('banda-rock')
    var radios = document.querySelectorAll('input[type="radio"]')

    console.log(radios);
    for(var index = 0; radios.length; index++) {
        if(radios[index].value === 'led-zeppelin') {
            radios[index].checked = true
        }
    }
}
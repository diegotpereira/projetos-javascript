var elemento = document.getElementById('minhaImagem')

elemento.onclick = function() {
    if (elemento.src.match('lampada-on')) {
        elemento.src = 'img/lampada-off.gif'
    } else {
        elemento.src = 'img/lampada-on.gif'
    }
}
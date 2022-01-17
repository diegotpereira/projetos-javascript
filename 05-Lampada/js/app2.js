var lampada = {

        // propriedade para sabermos o estado da lampada
        ligada: false,

        // representação da tag img
        elemento: document.getElementById('minhaImagem'),

        // método que acende a lampada
        acender: function() {
            this.elemento.src = 'img/lampada-on.gif'
            this.ligada = true
        },
        // método que apaga a lampada 
        apagar: function() {
            this.elemento.src = 'img/lampada-off.gif'
            this.ligada = false;
        }
    }
    // Método anexado ao evento 'click' da tag img
    // que alterna entre acessa e apagada
lampada.elemento.onclick = function() {
    if (lampada.ligada) {
        lampada.apagar()
    } else {
        lampada.acender()
    }
}
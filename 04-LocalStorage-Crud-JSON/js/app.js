// Ao carregar a página
window.onload = function() {

    listar()
    document.getElementById('frmCadastro').addEventListener('submit', adicionarOuAlterar)
    document.getElementById('frmCadastro').addEventListener('submit', listar)
}


// Variavel global
var idAlterar = null

// BLOCO SALVAR

// Evento Botão Cadastrar/Salvar
function adicionarOuAlterar(e) {

    // bloqueia a ação do browser de carregar página
    e.preventDefault();

    var nom = document.getElementById('txtNome').value
    var p = {
        //  //mesmo que if(nom = ""){ nom = "sem nome";}
        nome: !nom ? "sem nome" : nom,
        nasc: new Date(document.getElementById('dtpDataNascimento').value.replace("-", "/")),
        sexo: document.getElementById('rdoMasculino').checked ? 'M' : 'F',
        data: new Date()
    }
    if (idAlterar == null)
        adicionar(p)

    else if (idAlterar > 0)
        alterar(p)

    else
        alert('Ação desconhecida')
}

function adicionar(p) {
    var pessoas = []
    var idValido = 1;

    // Verificar item no localstorage
    if (localStorage.getItem('pessoa') !== null) {
        // Busca array objetos JSON
        pessoas = JSON.parse(localStorage.getItem('pessoa'))

        if (pessoas.length > 0)
            idValido = (function obterIdValido() {
                // percorre verificando se está vazio posição entre os numeros
                for (var index = 0; index < pessoas.length; index++)
                    if (pessoas[index].Id != index + 1)

                        return index + 1

                return pessoas[pessoas.length - 1].Id + 1
            })()
    }

    var pessoa = {
            Id: idValido,
            Nome: p.nome,
            DataNascimento: p.nasc.toLocaleString('pt-br').substring(0, 10),
            Sexo: p.sexo,
            DataCadastro: p.data.toLocaleString('pt-br')
        }
        // Adiciona o objeto ao último indice do array
    pessoas.push(pessoa)

    // Ordeno o array pelo ID do objeto
    pessoas.sort(function(a, b) {

        return a.Id - b.Id
    })

    // Armazenando no LocalStorage
    localStorage.setItem('pessoa', JSON.stringify(pessoas))

    // Redefine os campos do formulário
    document.getElementById('frmCadastro').reset()
}


//  BLOCO LISTAR
function listar() {
    if (localStorage.getItem('pessoa') == null)

        return

    var pessoas = JSON.parse(localStorage.getItem('pessoa'))
    var tbody = document.getElementById('tbodyResultados')

    tbody.innerHTML = ''

    for (var index = 0; index < pessoas.length; index++) {

        var id = pessoas[index].Id,
            nome = pessoas[index].Nome,
            nasc = pessoas[index].DataNascimento,
            sexo = pessoas[index].Sexo,
            data = pessoas[index].DataCadastro

        tbody.innerHTML += '<tr id="rowTable' + index + '">' +
            '<td>' + id + '</td>' +
            '<td>' + nome + '</td>' +
            '<td>' + nasc + '</td>' +
            '<td>' + sexo + '</td>' +
            '<td>' + data + '</td>' +
            '<td><button onclick="excluir(\'' + id + '\')">Excluir</button></td>' +
            '<td><button onclick="prepararAlterar(\'' + id + '\')">Alterar</button></td>' +
            '</tr>'
    }
}

// BLOCO ALTERAR
function prepararAlterar(idRow) {
    document.getElementById('btnCadastrarSalvar').value = 'Salvar'

    var txtNome = document.getElementById('txtNome'),
        dtpDataNascimento = document.getElementById('dtpDataNascimento'),
        rdoMasculino = document.getElementById('rdoMasculino'),
        rdoFeminino = document.getElementById('rdoFeminino')

    var pessoas = JSON.parse(localStorage.getItem('pessoa'))

    for (var index = 0; index < pessoas.length; index++) {
        if (pessoas[index].Id == idRow) {
            // popular os campos 
            txtNome.value = pessoas[index].Nome
                // //caso fosse tipo date toISOString().substring(0, 10);
            dtpDataNascimento.value = pessoas[index].DataNascimento.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')
            rdoMasculino.checked = !(rdoFeminino.checked = (pessoas[index].Sexo == 'F'))

            // recarrega a lista para limpar o th com background alterado
            listar()

            // coloco ID null (caso clicar em mais de um elemento no botao alterar)
            idAlterar = null

            if (idAlterar === null) {
                // muda o background da nova linha
                var th = document.getElementById('rowTable' + index)
                th.className = 'estadoAlteracao'
            }

            // atribuir o Id a variavel global
            idAlterar = pessoas[index].Id
            break
        }
    }
}

function alterar(p) {
    var btn = document.getElementById('btnCadastrarSalvar')

    pessoas = JSON.parse(localStorage.getItem('pessoa'))
        //
    for (var index = 0; index < pessoas.length; index++) {

        if (pessoas[index].Id == idAlterar) {

            pessoas[index].Nome = p.nome
            pessoas[index].DataNascimento = p.nasc.toLocaleString('pt-br').substring(0, 10)
            pessoas[index].Sexo = p.sexo
            pessoas[index].DataCadastro = p.data.toLocaleString('pt-br')

            btn.value = 'Cadastrar'
            idAlterar = null

            localStorage.setItem('pessoa', JSON.stringify(pessoas))
            document.getElementById('frmCadastro').reset()

            break
        }
    }
}

// BLOCO EXCLUIR
function excluir(codigo) {

    // busca os dados no localstorage
    var pessoas = JSON.parse(localStorage.getItem('pessoa'))

    for (var index = 0; index < pessoas.length; index++)
        if (pessoas[index].Id = codigo)
            pessoas.splice(index, 1)

    localStorage.setItem('pessoa', JSON.stringify(pessoas))

    listar()

    // se não houver nenhum registro, limpar o storage
    if (pessoas.length == 0)
        window.localStorage.removeItem('pessoa')

}
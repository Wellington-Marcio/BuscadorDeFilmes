const btnBuscar = document.getElementById('buscar');
const inputFilme = document.getElementById('filme');
const loader = document.getElementById('loader');
const poster = document.getElementById('poster');
const erro = document.getElementById('erro');

// Card onde aparece o resultado
const resultado = document.getElementById('resultado');
// A tag que está o diretor
const ano = document.getElementById('ano');
const genero = document.getElementById('genero');
const duracao = document.getElementById('duracao');
const diretor = document.getElementById('diretor');
const sinopse = document.getElementById('sinopse');

btnBuscar.addEventListener('click', buscaFilmes);

inputFilme.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        buscaFilmes();
    }
});

// Esconder o erro e limpar os dados ao começar a limpar o input
inputFilme.addEventListener('input', function () {
    erro.classList.add('hide'); // Esconde o erro assim que o usuário começa a limpar o input
    limparDadosNaTela(); // Limpa os dados exibidos na tela
});

// Função para limpar os dados exibidos na tela
function limparDadosNaTela() {
    resultado.classList.add('hide'); // Esconde o card de resultado
    poster.src = ""; // Limpa o poster
    diretor.textContent = ""; // Limpa o texto do diretor
    ano.textContent = ""; // Limpa o ano
    genero.textContent = ""; // Limpa o gênero
    duracao.textContent = ""; // Limpa a duração
    sinopse.textContent = ""; // Limpa a sinopse
}

// Assíncrona
async function buscaFilmes() {
    // Removo o hide para exibir o loader
    loader.classList.remove('hide');
    const API_KEY = '6fb12a2b';
    const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=`;

    const urlDaBusca = URL + inputFilme.value;

    // Só posso usar await em funções assíncronas
    const response = await fetch(urlDaBusca);

    // Objeto com o json de resposta
    const data = await response.json();
    // Posso acessar qualquer propriedade do objeto
    console.log(data);

    // Conferir se deu certo
    if (data.Response == "False") {
        erro.classList.remove('hide');
        loader.classList.add('hide');
        return;
    }

    // Chamo a função que vai mostrar os dados do filme no html
    mostrarDadosNaTela(data);

    // Adiciono o hide para não mostrar o loader mais
    loader.classList.add('hide');
}

function mostrarDadosNaTela(infoDoFilme) {
    // Estou removendo a classe hide do meu elemento
    resultado.classList.remove('hide');

    // Adicionar o poster
    poster.src = infoDoFilme.Poster;

    // Adiciono o texto do diretor na tag diretor
    diretor.textContent = infoDoFilme.Director;

    ano.textContent = infoDoFilme.Year;

    genero.textContent = infoDoFilme.Genre;

    duracao.textContent = infoDoFilme.Runtime;

    sinopse.textContent = infoDoFilme.Plot;
}

const TMDB_API_KEY = 'ae003f0ab4c979d9b2f25ac02386c394';

 function pesquisarFilme() {
    var nomeFilme = document.getElementById("inputFilme").value.trim();
    if (nomeFilme !== "") {
      buscarInformacoesFilme(nomeFilme);
    }
  }

async function buscarInformacoesFilme(nomeFilme) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(nomeFilme)}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const filme = data.results[0];

            const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${filme.id}/videos?api_key=${TMDB_API_KEY}`);
            const trailerData = await trailerResponse.json();

            // Adiciona a chave do vídeo (trailer) ao objeto do filme
            if (trailerData.results && trailerData.results.length > 0) {
                filme.trailer_key = trailerData.results[0].key;
            }

            // Tenta obter a duração da chamada detalhada do filme
            const detalhesResponse = await fetch(`https://api.themoviedb.org/3/movie/${filme.id}?api_key=${TMDB_API_KEY}`);
            const detalhesData = await detalhesResponse.json();

            // Verifica se a duração está disponível nos detalhes
            if (detalhesData.runtime) {
                filme.runtime = detalhesData.runtime;
            } else {
                filme.runtime = undefined;
            }

            exibirDetalhesFilme(filme);
        } else {
            alert("Filme não encontrado. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao buscar informações do filme:", error);
    }
}


function exibirDetalhesFilme(filme) {
    var filmesContainer = document.getElementById("filmes-container");
    filmesContainer.innerHTML = '';

    var filmeDiv = document.createElement('div');
    filmeDiv.className = 'filme-item';
    filmeDiv.style.display = 'inline-block';
    filmeDiv.style.margin = '10px';
    filmeDiv.style.color = 'white';

    var imagem = document.createElement('img');
    imagem.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
    imagem.style.marginBottom = '10px';

    var nomeParagrafo = document.createElement('p');
    nomeParagrafo.textContent = filme.title;
    nomeParagrafo.style.color = 'white';

    var duracaoParagrafo = document.createElement('p');
    duracaoParagrafo.style.color = 'white';
    if (filme.runtime !== undefined && filme.runtime !== null) {
        duracaoParagrafo.textContent = `Duração: ${filme.runtime} minutos`;
    } else {
        duracaoParagrafo.textContent = 'Duração não disponível';
    }

    var dataLancamentoParagrafo = document.createElement('p');
    dataLancamentoParagrafo.textContent = `Data de Lançamento: ${filme.release_date}`;
    dataLancamentoParagrafo.style.color = 'white';

    var resumoParagrafo = document.createElement('p');
    resumoParagrafo.textContent = filme.overview;
    resumoParagrafo.style.color = 'white';

    var botaoTrailer = document.createElement('button');
    botaoTrailer.textContent = 'Assistir Trailer';
    botaoTrailer.addEventListener('click', function () {
        if (filme.trailer_key) {
            window.open(`https://www.youtube.com/watch?v=${filme.trailer_key}`, '_blank');
        } else {
            alert("Trailer não disponível para este filme.");
        }
    });

    filmeDiv.appendChild(imagem);
    filmeDiv.appendChild(nomeParagrafo);
    filmeDiv.appendChild(duracaoParagrafo);
    filmeDiv.appendChild(dataLancamentoParagrafo);
    filmeDiv.appendChild(resumoParagrafo);
    filmeDiv.appendChild(botaoTrailer);

    filmesContainer.appendChild(filmeDiv);
}

      
function abrirCatalogo() {
  
var abrirCatalogo = document.getElementById("filmes-container");
  abrirCatalogo.style.display = "block";  
  abrirCatalogo.innerHTML = '';
 
var listaFilmes = [ "https://cdna.artstation.com/p/assets/images/images/063/096/684/large/william-j-harris-oppenheimer-movie-poster-2023.jpg","https://br.web.img3.acsta.net/pictures/16/10/06/23/05/054278.jpg","https://img.elo7.com.br/product/zoom/2364686/big-poster-filme-homem-aranha-no-aranhaverso-90x60-cm-lo-011-geek.jpg","https://myhotposters.com/cdn/shop/products/mL5321_1024x1024.jpg?v=1620815169","https://img.elo7.com.br/product/zoom/2679A17/big-poster-filme-matrix-lo02-tamanho-90x60-cm-poster-de-filme.jpg"];

var nameMovies = ['Oppenheimer', 'A Chegada', 'AranhaVerso', 'Army of the Dead', 'Matrix']

for(var i=0; i < listaFilmes.length; i++) {
  if (listaFilmes[i].endsWith('jpg')){
    var filmeDiv = document.createElement('div');
      filmeDiv.style.display = 'inline-block';
      filmeDiv.style.margin = '10px';
      filmeDiv.style.color = 'white';
    
    var imagem = document.createElement('img');
      imagem.src = listaFilmes[i];
    
    var nomeParagrafo = document.createElement('p');
      nomeParagrafo.textContent = nameMovies[i];
    
   filmeDiv.appendChild(imagem);
      filmeDiv.appendChild(nomeParagrafo);

      abrirCatalogo.appendChild(filmeDiv);  
    }
  }
  document.getElementById("btnVoltar").style.display = "block";  document.getElementById("btnAbrirCatalogo").style.display = "none";
}

function voltarParaPaginaInicial() {
  var abrirCatalogo = document.getElementById("filmes-container");
  abrirCatalogo.style.display = "none";
  
document.getElementById("btnAbrirCatalogo").style.display = "block";
  
  document.getElementById("btnVoltar").style.display = "none";
}
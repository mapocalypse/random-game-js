var g_PontosA = 0;
var g_PontosB = 0;
var g_ContarJogadas = 0; //contar o número de clicks nos botões

const main = document.getElementById("main");

main.onclick = function (event) {
    if (event.target.id == "btn-a" || event.target.id == "btn-b") {
         if (g_ContarJogadas < 30) {
            g_ContarJogadas++;
        }
        else {
            gameOver("GAME OVER! The number of clicks has reached 30.");
            return;
        } 

        var numeroJogada = Math.floor(Math.random() * 20 + 1);
        
        var blocos;

        if (event.target.id == "btn-a") {
            blocosLive = document.getElementsByClassName("bloco-b"); //está a apontar para a versão atualizada dos meus blocos.
            blocos = Array.prototype.slice.call(blocosLive); //atualiza a cada click. cria um array, e mesmo que a classe seja alterada, eles mantém-se no array.
            document.getElementById("btn-a").style.display = "none";
            document.getElementById("btn-b").style.display = "block";

            if (numeroJogada == 13) {
                g_PontosB = g_PontosB * 2;
            }
        }
        else {
            blocosLive = document.getElementsByClassName("bloco-a");
            blocos = Array.prototype.slice.call(blocosLive);
            document.getElementById("btn-b").style.display = "none";
            document.getElementById("btn-a").style.display = "block";

            if (numeroJogada == 13) {
                g_PontosA = g_PontosA * 2;
            }
        }
    }

    for (i = 0; i < blocos.length; i++) {
        if (numeroJogada == blocos[i].firstChild.innerHTML) {
            if (event.target.id == "btn-a") {
                g_PontosA = g_PontosA + parseInt(blocos[i].firstChild.innerHTML);
            }
            else {
                g_PontosB = g_PontosB + parseInt(blocos[i].firstChild.innerHTML);
            }
            blocos[i].className = "bloco-apagado";
        }
    }
    document.getElementById("score-a").innerHTML = "Points A: " + g_PontosA;
    document.getElementById("score-b").innerHTML = "Points B: " + g_PontosB;

    if (blocosLive.length == 0) {
        gameOver("GAME OVER!");
    }

    if (!numeroJogada) {
        document.getElementById("number").innerHTML = '';
    } else {
        document.getElementById("number").innerHTML = '<p> Number: ' + numeroJogada + '<p>';
    }
}

function iniciarJogo() { //chamada no onload do body

    var main = document.getElementById("main");

    for (i = 0; i < 2; i++) {
        var tabuleiro = document.createElement("div"); //criar um div para cada jogador
        main.appendChild(tabuleiro);

        var pontos = document.createElement("p");
        tabuleiro.appendChild(pontos);

        if (i == 0) { //i == 0, bloco tabuleiro A
            pontos.id = "score-a";
            pontos.innerHTML = "Points A: " + g_PontosA;
            tabuleiro.className = "pontos-a";
            var nomeBloco = "bloco-a";
            var idBtn = "btn-a";
        }
        else { //i == 1, bloco tabuleiro B
            pontos.id = "score-b";
            pontos.innerHTML = "Points B: " + g_PontosB;
            tabuleiro.className = "pontos-b";
            var nomeBloco = "bloco-b";
            var idBtn = "btn-b";
        }
        for (j = 0; j < 3; j++) { //dentro do div de cada jogador, criar três linhas para os botões
            var linha = document.createElement("div");
            linha.className = "linha";
            tabuleiro.appendChild(linha);

            for (h = 0; h < 3; h++) { //dentro de cada linha, criar três blocos
                var bloco = document.createElement("div");
                bloco.className = nomeBloco;
                linha.appendChild(bloco);

                var numero = document.createElement("p"); //dentro de cada bloco, criar números random
                bloco.appendChild(numero);
                numero.innerHTML = Math.floor(Math.random() * 20 + 1);
            }
        }
        var btn = document.createElement("button");
        btn.className = "btn";
        btn.id = idBtn;
        tabuleiro.appendChild(btn);
        btn.innerHTML = "HIT ME!";
    }

    document.getElementById("btn-b").style.display = "none";

    let tempRecord = localStorage.getItem("record");

    if (tempRecord == null) { //se for a primeira vez que a página é aberta, não existe na local storage
        localStorage.setItem("record", 0); //no load, cria a local storage com 0
        document.getElementById("record").innerHTML = '<h2>Record: 0<h2>'
    }
    else {
        document.getElementById("record").innerHTML = '<h2>Record: ' + tempRecord + '<h2>' //mostra o temp_Record que é o que se vai buscar na local storage
    }

}

function gameOver(msg) {
    
    let tempRecord = localStorage.getItem("record");

    tempRecord = Math.max(g_PontosA, g_PontosB, tempRecord);
    localStorage.setItem("record", tempRecord);

    setTimeout(function () { //forçar as outras alterações antes do alerta
        alert(msg);
    }, 0)

    document.location.reload();
}
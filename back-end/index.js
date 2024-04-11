// Variável de elemento HTML
const outputElement = document.getElementById('output');
const inputElement = document.getElementById('input');
const submitButton = document.getElementById('submit');
const useOnceButton = document.getElementById('use-once');

// Função para adicionar mensagem ao output
function addToOutput(message) {
    // Cria um novo parágrafo
    const paragraph = document.createElement('p');
    paragraph.textContent = message;

    // Adiciona o novo parágrafo ao output
    outputElement.appendChild(paragraph);

    // Rola o output para o final
    outputElement.scrollTop = outputElement.scrollHeight;
}

// Event listener para o botão de uso único
useOnceButton.addEventListener('click', function () {
    // Desabilita o botão após o primeiro clique
    useOnceButton.disabled = true;

    // Adiciona uma mensagem ao output indicando que o botão foi pressionado
    addToOutput("Jogo iniciado!");
    console.log("inicio");
    iniciarJogo();
});

// Imports necessários
import Usuario from "../back-end/Usuario.js";
import Inimigo from "../back-end/Inimigo.js";

// Função para simular entrada de dados

//Variaveis globais
let inimigoAtual = null;
let pontosColocados = false;
let pontosExtras = 0;
let rodadas = 0;
let jogoRodando = true;
let cooldownCura = false;
let contadorCura = 0;
let inimigosMortos = 0;
let escudoAcumulos = 0;
let pericia = 0;
let tocarMusica = false;


//Gerador aleatório
function aleatorio() {
    let dataAtual = new Date();
    let milissegundos = dataAtual.getMilliseconds();
    let sorte = Math.round(milissegundos / 100);
    if (jogador.gamemode != "normal") {

        addToOutput("Sorte: " + sorte);
    }
    return sorte;
}

//Nome-vida-dano-vivo-ID
const inimigo01 = new Inimigo("Zumbi", 12, 3, true, 1);
const inimigo02 = new Inimigo("Caído", 10, 6, true, 2);
const inimigo03 = new Inimigo('goblin', 10, 4, true, 3);
const inimigo04 = new Inimigo('esqueleto', 15, 5, true, 1);
const inimigo05 = new Inimigo("Bruxa", 20, 6, true, 4);
const inimigo06 = new Inimigo('orc', 20, 6, true, 5);
const inimigo07 = new Inimigo('mago', 20, 2, true, 7);
const inimigo08 = new Inimigo("Fantasma", 20, 5, true, 6);
const inimigo09 = new Inimigo('Rei', 10, 15, true, 3);
const inimigo10 = new Inimigo("Lobisomem", 22, 7, true, 11);
const inimigo11 = new Inimigo("Lobisomem", 22, 7, true, 18);
const inimigo12 = new Inimigo("Vampiro", 28, 9, true, 19);
const inimigo13 = new Inimigo("Vampiro", 28, 9, true, 12);
const inimigo14 = new Inimigo('espectro', 25, 8, true, 7);
const inimigo15 = new Inimigo("Medusa", 30, 8, true, 17);
const inimigo16 = new Inimigo('dragão', 30, 10, true, 6);
const inimigo17 = new Inimigo("Ciclope", 40, 12, true, 16);
const inimigo18 = new Inimigo('demonio', 35, 12, true, 8);
const inimigo19 = new Inimigo('elemental', 40, 15, true, 9);
const inimigo20 = new Inimigo('monstro', 50, 20, true, 10);


// Lista de inimigos por tier
const inimigosTier1 = [inimigo01, inimigo02, inimigo03, inimigo04, inimigo05, inimigo06, inimigo07];
const inimigosTier2 = [inimigo08, inimigo09, inimigo10, inimigo11, inimigo12, inimigo13, inimigo14];
const inimigosTier3 = [inimigo15, inimigo16, inimigo17, inimigo18, inimigo19, inimigo20];


//Funções
function criarInimigo1() {
    while (inimigoAtual == null || inimigoAtual.vivo == false) {
        let indice = aleatorio() % inimigosTier1.length;
        inimigoAtual = Object.assign({}, inimigosTier1[indice]);
    }
    if (inimigoAtual == null || inimigoAtual.vivo == false) {
        alert("Deu algo de errado..");
        criarInimigo1();
    }
    inimigoAtual.cooldown = false;
}

function criarInimigo2() {
    while (inimigoAtual == null || inimigoAtual.vivo == false) {
        let indice = aleatorio() % inimigosTier2.length;
        inimigoAtual = Object.assign({}, inimigosTier2[indice]);
    }
    if (inimigoAtual == null || inimigoAtual.vivo == false) {
        alert("Deu algo de errado...");
        criarInimigo2();
    }
    inimigoAtual.cooldown = false;
}

function criarInimigo3() {
    while (inimigoAtual == null || inimigoAtual.vivo == false) {
        let indice = aleatorio() % inimigosTier3.length;
        inimigoAtual = Object.assign({}, inimigosTier3[indice]);
    }
    if (inimigoAtual == null || inimigoAtual.vivo == false) {
        addToOutput("Deu algo de errado...");
        criarInimigo3();
    }
    inimigoAtual.cooldown = false;
}

function tierInimigo() {
    //Apaga o inimigo atual
    inimigoAtual = null;

    //Verifica o quão forte o inimigo vai ser
    if (inimigosMortos <= 3) {
        criarInimigo1();
    } else if (inimigosMortos <= 8) {
        criarInimigo2();
    } else if (inimigosMortos <= 15) {
        criarInimigo3();
    } else {
        alert("Jogo chegou no final atual!");
        inimigosMortos = 0;
        tierInimigo();
    }
}

async function tomarDano() {
    if (inimigoAtual.vivo == true) {
        if (inimigoAtual.cooldown == false) {
            jogador.escudoAtual -= inimigoAtual.dano;
            if (jogador.escudoAtual < 0) {
                let [frase1, frase2] = jogador.perderVida();
                addToOutput(frase1);
                if (jogador.vivo == false) {
                    addToOutput(frase2);
                }

                bladeAcumulos();
            }
        } else {
            await menu2();
        }
    }
}

// Função para realizar o ataque
async function darDano() {
    addToOutput("---------------------------------");
    addToOutput(`Pontos de perícia: ${pericia}`);
    addToOutput("1 - Ataque básico");
    addToOutput("2 - Ataque forte");
    addToOutput("Digite o tipo de ataque: ");
    const acao = await handleEntradaDados(); // Espera pela entrada do jogador
    console.log(acao);

    if (acao == "1") {
        inimigoAtual.vida -= jogador.dano;
        if (pericia < 5) {
            ++pericia;
        }
    } else if (acao == "2") {
        if (pericia == 0) {
            console.log("sem pontos de perícia!");
            addToOutput("Pontos de perícia insuficientes!");
            await darDano();

        } else {
            --pericia;
            console.log(inimigoAtual.vida -= jogador.dano * 2);
            inimigoAtual.vida -= jogador.dano * 2;
        }

    } else {
        alert("Ação desconhecida!");
        await darDano(); // Chama novamente a função em caso de ação desconhecida
        return;
    }

    if (inimigoAtual.vida <= 0) {
        inimigoAtual.vivo = false;
        addToOutput("---------------------");
        addToOutput("Inimigo derrotado!");
        inimigosMortos++;
        addToOutput(`Inimigos mortos: ${inimigosMortos}`);
        await colocarPontos();
    }
}

function fugir() {
    tomarDano();
    inimigoAtual = null;
    tierInimigo();
}

async function menu() {
    addToOutput("------------------------");
    addToOutput("1-Atacar   2-Defender   3-Fugir   4-Nada   5-Sepuku   6-Recuperar HP");
    addToOutput("Digite sua ação: ");
    const acao = await handleEntradaDados(); // Aguarda a entrada do jogador
    if (acao === "1") {
        await darDano();
    } else if (acao === "2") {
        inimigoAtual.cooldown = true;
    } else if (acao === "3") {
        fugir();
    } else if (acao === '4') {
        addToOutput("Fazendo grandes nada!");
    } else if (acao === '5') {
        jogoRodando = false;
    } else if (acao === '6' || !cooldownCura) {
        recuperarVida();
        cooldownCura = true;
    } else {
        alert("Ação desconhecida!");
        await menu(); // Volta a exibir o menu
    }
}

async function menu2() {
    jogador.escudoAtual -= Math.ceil(inimigoAtual.dano / 3);
    jogador.perderVida();
    jogadorStatus();
    rodadas++;
    cooldownCura = false;
    addToOutput("------------------------");
    addToOutput(`Rodada: ${rodadas}`);
    addToOutput("Inimigo Atordoado!");
    addToOutput("1-Atacar   \n2-Fugir    \n3-Fechar    \n4-Nada");
    addToOutput("Digite sua ação: ");
    let acao = await handleEntradaDados();
    if (acao == "1") {
        await darDano();
    } else if (acao == "2") {
        fugir();
    } else if (acao == "3") {
        jogoRodando = false;
    } else if (acao == "4") {
        addToOutput("Fazendo grandes nada!");
    } else {
        alert("Ação inválida!");
    }
    inimigoAtual.cooldown = false;
}

function jogadorStatus() {
    addToOutput(`Nome: ${jogador.nome}`);
    addToOutput(`Vida: ${jogador.vida}`);
    addToOutput(`Dano: ${jogador.dano}`);
    addToOutput(`Escudo: ${jogador.escudoAtual}`);
    addToOutput(`Gamemode: ${jogador.gamemode}`)
    if (jogador.nome == "Blade") {
        addToOutput(`Acumulos: ${jogador.acumulos}`)
    }
    addToOutput("--------------------------------");
}

function inimigoStatus() {
    addToOutput(`===Inimigo===`);
    addToOutput(`Nome: ${inimigoAtual.nome}`);
    addToOutput(`Vida: ${inimigoAtual.vida}`);
}

async function colocarPontos() {
    let cheatCode = true;

    switch (inimigoAtual.id) {
        case 1:
            pontosExtras = 3;
            break;
        case 2:
            pontosExtras = 5;
            break;
        case 3:
            pontosExtras = 7;
            break;
        case 4:
            pontosExtras = 9;
            break;
        case 5:
            pontosExtras = 11;
            break;
        case 6:
            pontosExtras = 13;
            break;
        case 7:
            pontosExtras = 15;
            break;
        case 8:
            pontosExtras = 17;
            break;
        case 9:
            pontosExtras = 19;
            break;
        case 10:
            pontosExtras = 21;
            break;
        case 11:
            pontosExtras = 23;
            break;
        case 12:
            pontosExtras = 25;
            break;
        case 13:
            pontosExtras = 27;
            break;
        case 14:
            pontosExtras = 29;
            break;
        case 15:
            pontosExtras = 31;
            break;
        case 16:
            pontosExtras = 33;
            break;
        case 17:
            pontosExtras = 35;
            break;
        case 18:
            pontosExtras = 37;
            break;
        case 19:
            pontosExtras = 39;
            break;
        case 20:
            pontosExtras = 41;
            break;
        default:
            alert("!!!--------Deu algo de errado...--------!!!");
            break;
    }
    pontosColocados = false;

    while (pontosColocados == false) {
        addToOutput("------------------------");
        addToOutput(`Ensira seus pontos ganhos (${pontosExtras}):`);
        addToOutput('Max por atributo: ' + inimigosMortos * 5);
        addToOutput("");
        addToOutput("VIDA:");
        let verificarVida = parseInt(await handleEntradaDados());
        addToOutput("DANO:")
        let verificarDano = parseInt(await handleEntradaDados());
        addToOutput("ESCUDO:")
        let verificarEscudo = parseInt(await handleEntradaDados());

        if (
            verificarDano + verificarEscudo + verificarVida > pontosExtras ||
            verificarDano < 0 ||
            verificarEscudo < 0 ||
            verificarVida < 0
        ) {
            alert("---====---Pontuação inválida!---====---");
        } else if (verificarDano == 0 && verificarEscudo == 0 && verificarVida == 0 && cheatCode == true && jogador.gamemode != "normal") {
            addToOutput("===---===Enter code===---===\n: ");
            addToOutput("");
            let codigo = await handleEntradaDados();
            switch (codigo) {
                case "5795":
                    addToOutput("Pontos: ")
                    pontosExtras = parseInt(await handleEntradaDados());
                    cheatCode = false;
                    break;
                case "9756":
                    addToOutput("Vida: ")
                    jogador.vida = parseInt(await handleEntradaDados());
                    cheatCode = false;
                    break
                case "1111":
                    addToOutput("Dano: ");
                    jogador.dano = parseInt(await handleEntradaDados());
                    cheatCode = false;
                    break
                default:
                    addToOutput("");
                    alert("---====---Código inválido!---====---");
                    cheatCode = false;
                    break;
            }
        } else if (
            (verificarVida > inimigosMortos * 5 ||
                verificarDano > inimigosMortos * 5 ||
                verificarEscudo > inimigosMortos * 5) &&
            jogador.nome != "Blade"
        ) {
            addToOutput("");
            addToOutput("Pontuação excede limite máximo atual: " + inimigosMortos * 5);
        } else {
            jogador.vida += verificarVida;
            jogador.dano += verificarDano;
            jogador.escudoTotal += verificarEscudo;
            jogador.escudoAtual = jogador.escudoTotal;
            pontosColocados = true;
        }
    }
    pontosExtras = 0;
}


async function bladeAcumulos() {
    if (jogador.acumulos == 5) {
        addToOutput("=-=-=-=-=\nA vale... to send you!\n=-=-=-=-=");
        recuperarVida();
        await darDano();
        jogador.acumulos = 0;
    }
}


function regenEscudo() {
    escudoAcumulos++;

    if (escudoAcumulos == 5) {
        jogador.escudoAtual = jogador.escudoTotal;
        escudoAcumulos = 0;
        addToOutput("Escudo Recuperado!");
    }
}

function recuperarVida() {
    if (jogador.vivo == true) {
        jogador.vida += 5;
        addToOutput("---------------------");
        addToOutput("HP recuperado!");
    } else if (jogador.nome == "Blade") {
        jogador.vida += 15;
        jogador.dano += 5;
        addToOutput("---------------------");
        addToOutput("Desnecessário...");
    }
}

let jogador;

// Função principal para iniciar o jogo
async function iniciarJogo() {
    try {
        // Aguarda o jogador inserir seu nome antes de criar o jogador
        await criarJogador();
        criarInimigo1();

        // Loop principal do jogo
        while (jogoRodando) {
            console.log("loop");

            //música xandão 
            if ((jogador.dano || jogador.vida || jogador.escudoTotal) >= 1000) {
                if (jogador.gamemode == "Big Xande" || jogador.gamemode == "normal") {
                    console.log("entrou na música Xandão");
                    tocarMusica = true;
                    tocarXandao();
                }
            }
            //música AlienX
            console.log(jogador.gamemode);
            if (jogador.gamemode == "God Mode" || jogador.gamemode == "Dev Mode") {
                console.log("entrou na música AlienX");
                tocarMusica = true;
                tocarAlienX();
            }

            if (inimigoAtual.vivo) {
                if (jogador.vivo || jogador.nome === "Blade") {
                    if (contadorCura !== 6) {
                        ++contadorCura;
                    } else {
                        cooldownCura = false;
                        contadorCura = 0;
                    }
                    rodadas++;
                    addToOutput(`===---===Rodada: ${rodadas}===---===`);
                    jogadorStatus();
                    inimigoStatus();
                    await menu(); // Espera pela seleção do jogador
                } else {
                    jogoRodando = false;
                }

                if (inimigoAtual.vivo && (jogador.vivo || jogador.nome === "Blade")) {
                    tomarDano();
                }
            } else {
                tierInimigo();
            }
            regenEscudo();
        }
        addToOutput("Acabou por aqui!");
    } catch (error) {
        console.error(error); // Exibe o erro no console
    }
}

//função propícia a ser modificada--------------------

async function EntradaDados() {
    return new Promise((resolve, reject) => {
        function handleClick() {
            let testeEntrada = inputElement.value.trim();
            console.log("----------------");
            console.log(testeEntrada);
            console.log(typeof (testeEntrada));

            if (testeEntrada === '') {
                alert("Por favor, digite algo antes de pressionar o botão de submit.");
                inputElement.value = '';
            } else {
                resolve(testeEntrada);
                inputElement.value = '';
                submitButton.removeEventListener('click', handleClick); // Remove o manipulador de eventos
            }
        }

        submitButton.addEventListener('click', handleClick);
    });
}

async function handleEntradaDados() {
    let entrada;
    do {
        entrada = await EntradaDados();
    } while (entrada === '');
    return entrada;
}

//função acima propícia a ser modificada -------------------------------

// Função para criar o jogador
async function criarJogador() {
    addToOutput("Digite seu nome:");
    const nome = await handleEntradaDados(); // Aguarda o jogador inserir o nome
    console.log(nome);

    jogador = new Usuario(nome);

    switch (jogador.nome) {
        case "Aurawell":
            jogador.vida = 9223372036854775807;
            jogador.dano = 9223372036854775807;
            jogador.escudoTotal = 9223372036854775807;
            jogador.escudoAtual = jogador.escudoTotal;
            jogador.vivo = true;
            jogador.gamemode = "Dev Mode";
            jogador.acumulos = 0;
            break;

        case "RDLF":
        case "Rodolfo":
            jogador.vida = 4294967295;
            jogador.dano = 4294967295;
            jogador.escudoTotal = 4294967295;
            jogador.escudoAtual = jogador.escudoTotal;
            jogador.vivo = true;
            jogador.gamemode = "God Mode";
            jogador.acumulos = 0;
            break;

        case "sim":
            jogador.vida = 5;
            jogador.dano = 10;
            jogador.escudoTotal = 22;
            jogador.escudoAtual = jogador.escudoTotal;
            jogador.vivo = true;
            jogador.gamemode = "Test Mode";
            jogador.acumulos = 0;
            break;

        case "Blade":
            jogador.vida = 50;
            jogador.dano = jogador.vida;
            jogador.escudoTotal = 0;
            jogador.escudoAtual = jogador.escudoTotal;
            jogador.vivo = undefined;
            jogador.gamemode = "Imortal Mode";
            jogador.acumulos = 0;
            break;

        case "Xandão":
            jogador.vida = 1000;
            jogador.dano = 1000;
            jogador.escudoTotal = 1000;
            jogador.escudoAtual = 1000;
            jogador.vivo = true;
            jogador.gamemode = "Big Xande"
            jogador.acumulos = 0;
            break;

        default:
            while (pontosColocados == false) {
                addToOutput("Digite seus pontos em VIDA, DANO e ESCUDO (20 pontos):");
                addToOutput("VIDA:");
                let verificarVida = parseInt(await handleEntradaDados());
                addToOutput("DANO:");
                let verificarDano = parseInt(await handleEntradaDados());
                addToOutput("ESCUDO:");
                let verificarEscudo = parseInt(await handleEntradaDados());

                if (verificarDano + verificarEscudo + verificarVida > 20 || verificarDano < 0 || verificarEscudo < 0 || verificarVida <= 0) {
                    alert("Pontuação inválida!");
                } else {
                    jogador.vida = verificarVida;
                    jogador.dano = verificarDano;
                    jogador.escudoTotal = verificarEscudo;
                    jogador.escudoAtual = jogador.escudoTotal;
                    jogador.gamemode = "normal";
                    pontosColocados = true;
                    jogador.vivo = true;
                }
            }
            break;
    }
}

function tocarXandao() {
    console.log(tocarMusica);

    if (tocarMusica == true) {

        console.log(jogador.nome);
        if (jogador.nome != "Xandão") {
            jogador.gamemode = "Big Xande (paraguai)";
            addToOutput("====== Poder grandioso atingido! ======");
        }
        let audioElement = document.getElementById('xandao');
        audioElement.play();
    }
}
function tocarAlienX() {
    console.log(tocarMusica);

    if (tocarMusica == true) {
        addToOutput("====== Poder EXTRA grandioso atingido! ======");
        let audioElement = document.getElementById('alienX');
        audioElement.play();
    }
}
//5795
//9756
//1111
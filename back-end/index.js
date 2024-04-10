// Variável de elemento HTML
const outputElement = document.getElementById('output');
const inputElement = document.getElementById('input');
const submitButton = document.getElementById('submit');
const useOnceButton = document.getElementById('use-once');

let botaoApertado = false;

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
const inimigo05 = new Inimigo("Bruxa", 18, 6, true, 4);
const inimigo06 = new Inimigo('orc', 18, 6, true, 5);
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
    console.log("CriarInimigo01");
    while (inimigoAtual == null || inimigoAtual.vivo == false) {
        let indice = aleatorio() % inimigosTier1.length;
        inimigoAtual = Object.assign({}, inimigosTier1[indice]);
    }
    if (inimigoAtual == null || inimigoAtual.vivo == false) {
        addToOutput("Deu algo de errado..");
        criarInimigo1();
    }
    inimigoAtual.cooldown = false;
}

console.log("CriarInimigo02");
function criarInimigo2() {
    while (inimigoAtual == null || inimigoAtual.vivo == false) {
        let indice = aleatorio() % inimigosTier2.length;
        inimigoAtual = Object.assign({}, inimigosTier2[indice]);
    }
    if (inimigoAtual == null || inimigoAtual.vivo == false) {
        addToOutput("Deu algo de errado...");
        criarInimigo2();
    }
    inimigoAtual.cooldown = false;
}

console.log("CriarInimigo03");
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

console.log("TierInimigo");
function tierInimigo() {
    if (inimigosMortos <= 3) {
        criarInimigo1();
    } else if (inimigosMortos <= 8) {
        criarInimigo2();
    } else if (inimigosMortos <= 15) {
        criarInimigo3();
    } else {
        addToOutput("Jogo chegou no final atual!");
        inimigosMortos = 0;
        tierInimigo();
    }
}

console.log("tomarDano");
function tomarDano() {
    if (inimigoAtual.vivo == true) {
        if (inimigoAtual.cooldown == false) {
            jogador.escudoAtual -= inimigoAtual.dano;
            if (jogador.escudoAtual < 0) {
                jogador.perderVida();
                bladeAcumulos();
            }
        } else {
            menu2();
        }
    }
}

// Função para realizar o ataque
async function darDano() {
    addToOutput(`Pontos de perícia: ${pericia}\n1 - Ataque básico\n2 - Ataque forte`);
    addToOutput("Digite o tipo de ataque: ");
    const acao = await entradaDados(); // Espera pela entrada do jogador

    if (acao == "1") {
        inimigoAtual.vida -= jogador.dano;
        if (pericia < 5) {
            ++pericia;
        }
    } else if (acao == "2" && pericia >= 1) {
        --pericia;
        inimigoAtual.vida -= jogador.dano * 2;
    } else {
        addToOutput("Ação desconhecida!");
        await darDano(); // Chama novamente a função em caso de ação desconhecida
        return;
    }

    if (inimigoAtual.vida <= 0) {
        inimigoAtual.vivo = false;
        addToOutput("Inimigo derrotado!");
        inimigosMortos++;
        addToOutput(`Inimigos mortos: ${inimigosMortos}`);
        await colocarPontos();
    }
}

console.log("Fugir");
function fugir() {
    tomarDano();
    inimigoAtual = null;
    tierInimigo();
}

console.log("menu");
async function menu() {
    addToOutput("1 - Atacar \n2 - Defender \n3 - Fugir \n4 - Nada\n5 - Fechar\n6 - Recuperar HP");
    addToOutput("Digite sua ação: ");
    const acao = await entradaDados(); // Aguarda a entrada do jogador
    if (acao === "1") {
        await darDano();
    } else if (acao === "2") {
        inimigoAtual.cooldown = true;
    } else if (acao === "3") {
        fugir();
    } else if (acao === '4') {
        addToOutput("");
    } else if (acao === '5') {
        jogoRodando = false;
    } else if (acao === '6' || !cooldownCura) {
        recuperarVida();
        cooldownCura = true;
    } else {
        addToOutput("Ação desconhecida!");
        await menu(); // Volta a exibir o menu
    }
}

console.log("menu2");
async function menu2() {
    jogador.escudoAtual -= Math.ceil(inimigoAtual.dano / 3);
    jogador.perderVida();
    jogadorStatus();
    rodadas++;
    cooldownCura = false;
    addToOutput(`Rodada: ${rodadas}`);
    addToOutput("Inimigo Atordoado!");
    addToOutput("1 - Atacar \n2 - Fugir \n3 - Fechar");
    addToOutput("Digite sua ação: ");
    let acao = await entradaDados();
    if (acao == "1") {
        await darDano();
    } else if (acao == "2") {
        fugir();
    } else {
        jogoRodando = false;
    }
    inimigoAtual.cooldown = false;
}

console.log("jogadorStatus");
function jogadorStatus() {
    addToOutput(`Nome: ${jogador.nome}\nVida: ${jogador.vida}\nDano: ${jogador.dano}`);
    addToOutput(`Escudo: ${jogador.escudoAtual}\nGamemode: ${jogador.gamemode}`);
    if (jogador.nome == "Blade") {
        addToOutput(`Acumulos: ${jogador.acumulos}`)
    }
    addToOutput("--------------------------------");
}

console.log("inimigoStatus");
function inimigoStatus() {
    addToOutput(`===Inimigo===\nNome: ${inimigoAtual.nome}\nVida: ${inimigoAtual.vida}`);
}

console.log("colocarPontos");
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
            addToOutput("!!!--------Deu algo de errado...--------!!!");
            break;
    }
    pontosColocados = false;

    while (pontosColocados == false) {
        addToOutput("------------------------");
        addToOutput(`Ensira seus pontos ganhos (${pontosExtras}):`);
        addToOutput('Max por atributo: ' + inimigosMortos * 5);
        addToOutput("");
        addToOutput("VIDA:");
        let verificarVida = parseInt(await entradaDados());
        addToOutput("DANO:")
        let verificarDano = parseInt(await entradaDados());
        addToOutput("ESCUDO:")
        let verificarEscudo = parseInt(await entradaDados());

        if (
            verificarDano + verificarEscudo + verificarVida > pontosExtras ||
            verificarDano < 0 ||
            verificarEscudo < 0 ||
            verificarVida < 0
        ) {
            addToOutput("---====---Pontuação inválida!---====---");
        } else if (verificarDano == 0 && verificarEscudo == 0 && verificarVida == 0 && cheatCode == true && jogador.gamemode != "normal") {
            addToOutput("===---===Enter code===---===\n: ");
            addToOutput("");
            let codigo = await entradaDados();
            switch (codigo) {
                case 5795:
                    addToOutput("Pontos: ")
                    pontosExtras = parseInt(await entradaDados());
                    cheatCode = false;
                    break;
                case 9756:
                    addToOutput("Vida: ")
                    jogador.vida = parseInt(await entradaDados());
                    cheatCode = false;
                    break
                case 1111:
                    addToOutput("Dano: ");
                    jogador.dano = parseInt(await entradaDados());
                    cheatCode = false;
                    break
                default:
                    addToOutput("");
                    addToOutput("---====---Código inválido!---====---")
                    cheatCode = false;
                    break;
            }
        } else if (
            (verificarVida > inimigosMortos * 5 ||
                verificarDano > inimigosMortos * 5 ||
                verificarEscudo > inimigosMortos * 5) &&
            jogador.nome != "Blade"
        ) {
            addToOutput("")
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

console.log("bladeAcumulos");
async function bladeAcumulos() {
    if (jogador.acumulos == 5) {
        addToOutput("=-=-=-=-=\nA vale... to send you!\n=-=-=-=-=");
        recuperarVida();
        await darDano();
        jogador.acumulos = 0;
    }
}

console.log("regenEscudo");
function regenEscudo() {
    escudoAcumulos++;

    if (escudoAcumulos == 5) {
        jogador.escudoAtual = jogador.escudoTotal;
        escudoAcumulos = 0;
        addToOutput("Escudo Recuperado!");
    }
}

console.log("recuperarVida");
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
    // Aguarda o jogador inserir seu nome antes de criar o jogador
    await criarJogador();
    criarInimigo1();

    // Loop principal do jogo
    (async function loopPrincipal() {
        while (jogoRodando) {
            console.log("loop");

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
    })();
}



async function entradaDados() {
    // Retorna uma nova promessa que resolve com os dados fornecidos pelo usuário

    return new Promise((resolve, reject) => {

        // Função para lidar com o clique no botão de submit
        function handleClick() {

            // Obtem o valor do input
            let testeEntrada = inputElement.value.trim(); // Remova espaços em branco extras

            // Verifica se há algo digitado
            console.log(testeEntrada);
            console.log(typeof(testeEntrada));
            if (testeEntrada === '') {

                // Se não houver entrada, rejeita a promessa com uma mensagem de erro
                reject("Por favor, digite algo antes de pressionar o botão de submit. Eu ainda não fiz funcionar direito, cê bricou a página");

            } else {
                // Limpa o campo de entrada após o clique
                inputElement.value = '';

                // Remove o event listener após o clique
                submitButton.removeEventListener('click', handleClick);

                // Resolve a promessa com os dados fornecidos pelo usuário
                resolve(testeEntrada);
            }
        }

        // Adiciona o event listener para o botão de submit
        submitButton.addEventListener('click', handleClick);
    })
    .catch((erro) => {
        // Exibe uma mensagem de erro para o usuário
        alert(erro);
    });
}


// Função para criar o jogador
async function criarJogador() {
    addToOutput("Digite seu nome:");
    const nome = await entradaDados(); // Aguarda o jogador inserir o nome
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
            jogador.gamemode = "Imortal Mode";
            jogador.acumulos = 0;
            break;

        default:
            while (pontosColocados == false) {
                addToOutput("Digite seus pontos em VIDA, DANO e ESCUDO (20 pontos):");
                addToOutput("VIDA:");
                let verificarVida = parseInt(await entradaDados());
                addToOutput("DANO:");
                let verificarDano = parseInt(await entradaDados());
                addToOutput("ESCUDO:");
                let verificarEscudo = parseInt(await entradaDados());

                if (verificarDano + verificarEscudo + verificarVida > 20 || verificarDano < 0 || verificarEscudo < 0 || verificarVida <= 0) {
                    addToOutput("Pontuação inválida!");
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

//5795
//9756
//1111
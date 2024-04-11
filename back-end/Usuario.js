let frase1 = "";
let frase2 = "";

class Usuario {
  constructor(nome) {
    this.nome = nome;
  }
  vida;
  dano;
  escudoTotal;
  escudoAtual;
  gamemode;
  vivo;
  acumulos;

  morte() {
    if (this.nome === "Blade") {
      frase2 = "A morte se afasta...";
    } else {
      this.vivo = false;
      frase2 = "Game over!";
    }
  }

  verificarVivo() {
    if (this.vida > 0) {
      if (this.nome != "Blade") { this.vivo = true }

    }else {
      let frase = this.morte();
      return frase;
    }
  }

  perderVida() {
    if (this.escudoAtual < 0) {
      this.vida += this.escudoAtual;
      if (this.nome === "Blade") {
        this.dano -= this.escudoAtual;
        this.acumulos += 1;
        this.escudoAtual = 0;
        this.verificarVivo();
        return "...";

      }else {
        this.verificarVivo();
        frase1 = "Aih, tomei " + (-this.escudoAtual) + " de dano!";
        this.escudoAtual = 0;
        return [frase1, frase2];
      }
    }
  }
}

export default Usuario;
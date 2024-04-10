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
      return "A morte se afasta...";
    } else {
      this.vivo = false;
      return "Game over!";
    }
  }

  verificarVivo() {
    if (this.vida > 0) {
      if (this.nome != "Blade") { this.vivo = true }

    } else this.morte();
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
      } else {
        this.escudoAtual = 0;
        this.verificarVivo();
        return "Aih, tomei " + (-this.escudoAtual) + " de dano!";
      }
    }
  }
}

export default Usuario;
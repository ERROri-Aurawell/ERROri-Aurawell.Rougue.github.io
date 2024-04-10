class Inimigo {
  constructor(nome,vida,dano,vivo,id) {
    this.nome = nome;
    this.vida = vida;
    this.dano = dano;
    this.vivo = vivo;
    this.id = id;
  }
  cooldown;
}

export default Inimigo;
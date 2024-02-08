export class Product {
  readonly id?: number
  public nome!: string
  public pontos!: string
  public usuario!: string

  constructor(nome: string, pontos: string, usuario: string, id?: number) {
    this.id = id
    this.nome = nome
    this.pontos = pontos
    this.usuario = usuario
  }

  private getId() {
    return this.id
  }

  private getNome() {
    return this.nome
  }

  private getPontos() {
    return this.pontos
  }

  private getUsuario() {
    return this.usuario
  }

  private setNome(nome: string) {
    this.nome = nome
  }

  private setPontos(pontos: string) {
    this.pontos = pontos
  }

  private setUsuario(usuario: string) {
    this.usuario = usuario
  }
}

export interface JWKGenerator {
  generate(): Promise<JWKGenerator.Result>
}

export namespace JWKGenerator {
  export type PublicKey = string

  export type Result = {
    kty: "RSA"
    n: string
    e: string
    use: "sig"
    alg: "RS256"
    kid: string
  }
}
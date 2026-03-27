
export interface LoadJwks {
    load(): Promise<LoadJwks.Result>
}

export namespace LoadJwks {
    export type Result = {
    keys: JwkKey[]
  }

  export type JwkKey = {
        kty: "RSA"
        n: string
        e: string
        use: "sig"
        alg: "RS256"
        kid: string
    }
}
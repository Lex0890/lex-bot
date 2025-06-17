export type token_type = 'Bearer'

export interface token {
    token_type: token_type
    expires_in: number
    access_token: string
}



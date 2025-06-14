export type Clients = Client[]

export interface Client {
    publicId: string
    name: string
    email: string | null
    phone: string | null
    address: string | null
    hasSales: boolean
}
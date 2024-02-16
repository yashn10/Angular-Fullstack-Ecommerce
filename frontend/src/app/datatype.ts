export interface signup {
    name: string,
    email: string,
    password: string
}

export interface login {
    email: string,
    password: string
}

export interface addproducts {
    name: string,
    price: number,
    catagory: string,
    color: string,
    desc: string,
    image: string,
    quantity: number | undefined
    _id: number
}

export interface details {
    total: number,
    tax: number,
    delhivery: number
}
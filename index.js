


const fs = require("fs").promises;


class ProductManager {
    #products = [];
    idAuto = 1;
    code = 5;
    path = ``;
    constructor () {
        this.#products = [];
        this.path = `./products.json`
    }



    async getProducts () {

        try {
        
        const productFile = await fs.readFile(this.path, "utf-8")
        return JSON.parse(productFile);
    }
    catch (e) {
        await fs.writeFile(this.path, "[]");
        
        return "NO SE PUDO LEER EL ARCHIVO";
    }    
  }

  async addProducts(product){

    try {
        const productFile = await fs.readFile(this.path, "utf-8")
        let newProduct = JSON.parse(productFile);


        const valid = newProduct.find((p) => p.id === product.id || p.code === product.code);
        if (valid){
            throw new Error ('ID / CODE REPETIDO!')
        }
        
        if (newProduct.length > 0) {
            const lastProduct = newProduct[newProduct.length - 1];
            this.idAuto = lastProduct.id + 1
            this.code = lastProduct.code + 1;
        }

        newProduct.push({
            ...product, 
            id: this.idAuto++,
            code: this.code++,
        });

        await fs.writeFile(this.path, JSON.stringify(newProduct,null,2));
        return 'objeto creado correctamente'

    }
    catch (e) {
        throw new Error (e);
    }
  
}
async productFileParsed (id) {
    try {
    const productFile = await fs.readFile(this.path, "utf-8")
    let iDProduct = JSON.parse(productFile);

    const searchProduct = iDProduct.find((p) => p.id === id );

    if (!searchProduct) {
        throw new Error ("NO SE ENCONTRO EL PRODUCTO.")
    }
    return searchProduct; 
}
catch (e) {
    throw new Error (e)

}
    
}




  async updateProduct (id, product){
    try {

        const productFile = await fs.readFile(this.path, "utf-8")
        let products = JSON.parse(productFile);
    
        const idProduct = products.findIndex((p) => p.id === id);
        products.splice(idProduct,1,{id, ...product})
        await fs.writeFile(this.path, JSON.stringify(products,null,2));
        return 'PRODUCTO MODIFICADO!'
    }
    catch (e) {
        throw new Error (e)

    }
  }




  async deleteProduct (id){
    try {

        const productFile = await fs.readFile(this.path, "utf-8")
        let products = JSON.parse(productFile);
    
        const idProduct = products.find((p) => p.id === id);
        if(!idProduct) {
            throw new Error ("ID NO ENCONTRADO")
        }
    
        const deleteProduct = products.filter (p => p.id !== id)
    
        await fs.writeFile(this.path, JSON.stringify(deleteProduct,null,2));
    
        return 'PRODUCTO ELIMINADO!'
    }
    catch (e) {
        throw new Error (e)

    }
  }
}






const product1 = {
    title: "banana",
    description: "1kg de banana",
    price: 250,
    thumbnail: "imagenBanana",
    code:this.code,
    stock: 25,
};
const product2 = {
    title: "manzana",
    description: "1kg de manzana",
    price: 320,
    thumbnail: "imagenManzana",
    code:this.code,
    stock: 25,
};
const product3 = {
    title: "pera",
    description: "1kg de pera",
    price: 350,
    thumbnail: "imagenPera",
    code:this.code,
    stock: 25,
};

const ProductManager1 = new ProductManager (); 

const generate = async () => {
    console.log (await ProductManager1.addProducts({...product1}));
    console.log (await ProductManager1.addProducts({...product2}));
    console.log (await ProductManager1.addProducts({...product3}));
    
    console.log (await ProductManager1.getProducts())
    
};
    //    generate ();


const main = async() => {

    console.log ("Productos:" ,await ProductManager1.getProducts())
    console.log ("producto encontrado:", await ProductManager1.productFileParsed(1))

    console.log (await ProductManager1.updateProduct(2,{...product2, price: 500}))
    console.log ("Productos modificados:" ,await ProductManager1.getProducts())

    console.log (await ProductManager1.deleteProduct(3));
    console.log ("Producto eliminado:" ,await ProductManager1.getProducts())
    
};


   main ();


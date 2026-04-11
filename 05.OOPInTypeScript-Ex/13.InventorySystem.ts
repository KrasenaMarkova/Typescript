// Product class
class Product {
    private static _productCount = 0;
    private name: string;
    private price: number;

    public readonly id: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
        Product._productCount++;
        this.id = Product._productCount;

    // Getter for name
    get name(): string {
        return this.name;
    }

    // Setter for name with validation
    set name(newName: string) {
        if (newName.length < 1) {
            throw new Error("Product name must be at least 1 character long.");
        }
        this.name = newName;
    }

    // Getter for price
    get price(): number {
        return this.price;
    }

    // Setter for price with validation
    set price(newPrice: number) {
        if (newPrice <= 0) {
            throw new Error("Product price must be greater than 0.");
        }
        this.price = newPrice;
    }

    // Static getter for product count
    static get productCount(): number {
        return Product._productCount;
    }

    // Returns product details
    getDetails(): string {
        return `ID: ${this.id}, Name: ${this.name}, Price: $${this.price.toFixed(2)}`;
    }
}

// Inventory class
class Inventory {
    private products: Product[] = [];

    // Add a product to the inventory
    addProduct(product: Product): void {
        this.products.push(product);
    }

    // List all products and include the total product count
    listProducts(): string[] {
        const details = this.products.map(p => p.getDetails());
        details.push(`Total products created: ${Product.productCount}`);
        return details;
    }
}

// Example usage
const inventory = new Inventory();
const product1 = new Product("Laptop", 1200);
const product2 = new Product("Phone", 800);

inventory.addProduct(product1);
inventory.addProduct(product2);

console.log(inventory.listProducts());

// Answer
// ID: 1, Name: Laptop, Price: $1200
// ID: 2, Name: Phone, Price: $800
// Total products created: 2


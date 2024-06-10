export interface Product{
    id?: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image?: string,
    images?: string[];
    file?: File;
}

export interface ProductProps {
    productProp: Product;
  }
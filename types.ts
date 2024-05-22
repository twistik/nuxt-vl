export type Images = string[];
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Images;
}

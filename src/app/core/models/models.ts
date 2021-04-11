export interface Product {
  id?: number;
  category_id?: number;
  name?: string;
  name_ar?: string;
  name_en?: string;
  description?: string;
  size?: string;
  tax?: number;
  price?: number;
  image_dir?: string;
  image?: string;
  available?: number;
  image_name?: string;
  branch_id?: number;
  count?: number;
}

export interface Category {
  id?: number;
  name?: string;
  description?: string;
  image_dir?: string;
  image?: string;
  products: Product[];
  products_count?: number;
  sub_categories?: any[];
}

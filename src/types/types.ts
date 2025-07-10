// types.ts

export type OrderItemType = {
  item: string;
  renter: string;
  date: string;
  size: string;
  price: string;
  description: string;
  image: any;
  status: 'inProgress' | 'completed' | 'cancelled';
};

export type ItemType = {
  id: string;
  title: string;
  renter?: string;
  startDate?: string;
  endDate?: string;
  name?: string;
  price: string;
  status?: string;
  images?: any[];
  description: string,
  date: string;
  rating: string;
  image: any;
}

export type MessageItem = {
  id: string;
  name: string;
  message: string;
  time: string;
  unreadCount?: number;
  highlight?: boolean;
  online?: boolean;
  image: string;
}

export type CartItem = {
  id: number;
  userId: number;
  listingId: number;
  quantity: number;
  createdAt: string;
  listing: {
    id: number;
    renter?: string;
    name: string;
    size: string;
    price: number;
    slug: string | null;
    sku: string | null;
    weight: string | null;
    description: string;
    video: string;
    startDate: string;
    endDate: string;
    status: string;
    categoryId: number;
    subCategoryId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    images: {
      id: number;
      url: string;
      listingId: number;
    }[];
    category: {
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    subCategory: {
      id: number;
      name: string;
      categoryId: number;
      createdAt: string;
      updatedAt: string;
    };
  };
};
  
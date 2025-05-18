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
    renter: string;
    price: string;
    status?: string;
    description: string,
    date: string;
    rating: string;
    image: any;
  }
  
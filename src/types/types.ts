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
  
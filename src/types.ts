export interface PlacesData {
  restaurantList: {
    total: number;
    items: {
      id: string;
      name: string;
      category: string;
      hasBooking: boolean | null;
      imageUrl: string;
      address: string;
      isTableOrder: boolean | null;
      isPreOrder: boolean | null;
      isTakeOut: boolean | null;
    }[];
  };
}

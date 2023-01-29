export interface PlacesData {
  businesses: {
    total: number;
    items: {
      id: string;
      name: string;
      category: string;
      roadAddress: string;
      phone: string;
      businessHours: string;
    }[];
  };
}

export interface SitesData {
  result: {
    site: {
      page: number;
      list: {
        id: string;
        name: string;
        roadAddress: string;
        telDisplay: string;
        homepage: string;
        description: string;
      }[];
    };
    totalCount: number;
  };
}

export interface PlacesV2Data {
  result: {
    place: {
      page: number;
      totalCount: number;
      list: {
        id: string;
        name: string;
        category: string[];
        roadAddress: string;
        telDisplay: string;
        businessStatus: {
          businessHours: string;
        };
      }[];
    };
  };
}

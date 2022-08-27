import {request, gql} from 'graphql-request';
import {NextApiRequest, NextApiResponse} from 'next';
import {PlacesData} from '../../types';
import {sleep} from '../../utils';

const endpoint = 'https://api.place.naver.com/graphql';

const query = gql`
  query getOpeningPlaces($input: RestaurantListInput) {
    restaurantList(input: $input) {
      total
      items {
        id
        name
        category
        hasBooking
        imageUrl
        address
        isTableOrder
        isPreOrder
        isTakeOut
        __typename
      }
      __typename
    }
  }
`;

const getData = async (keyword: string, index: number) => {
  const data = await request<PlacesData>(endpoint, query, {
    input: {
      query: keyword,
      start: index,
      display: 40,
      filterOpening: true,
    },
  });

  return data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  const keyword = req.query.keyword as string;
  const index = Number(req.query.index as string);
  const data = await getData(keyword, index);

  // const total = data.restaurantList.total;
  //
  // const totalItems = [...data.restaurantList.items];
  // for (let i = 2; i <= total; i++) {
  //   // await sleep(10);
  //   const data = await getData(keyword, i);
  //   totalItems.push(...data.restaurantList.items);
  // }
  //
  // return res.status(200).json(totalItems);
  return res.status(200).json(data);
};

export default handler;

import {request, gql} from 'graphql-request';
import {NextApiRequest, NextApiResponse} from 'next';
import {PlacesData} from '../../types';
import {sleep} from '../../utils';

const endpoint = 'https://pcmap-api.place.naver.com/graphql';

const query = gql`
  query getPlacesList($input: PlacesInput) {
    businesses: places(input: $input) {
      total
      items {
        id
        name
        category
        roadAddress
        phone
        businessHours
        bookingUrl
      }
    }
  }
`;

const getData = async (keyword: string, index: number) => {
  const data = await request<PlacesData>(endpoint, query, {
    input: {
      query: keyword,
      start: index,
      display: 40,
    },
  }, {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
  });

  return data.businesses;
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

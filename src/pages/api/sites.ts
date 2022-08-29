import {NextApiRequest, NextApiResponse} from 'next';
import {PlacesData} from '../../types';
import axios from 'axios';

const endpoint = 'https://m.map.naver.com/search2/searchMore.naver';

const getData = async (keyword: string, index: number) => {
  const data = await axios.get<PlacesData>(endpoint, {
    params: {
      query: keyword,
      sm: 'clk',
      style: 'v5',
      page: index,
      displayCount: 75,
      type: 'SITE_1',
    },
  });

  return data.data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  const keyword = req.query.keyword as string;
  const index = Number(req.query.index as string);
  const data = await getData(keyword, index);

  return res.status(200).json(data);
};

export default handler;

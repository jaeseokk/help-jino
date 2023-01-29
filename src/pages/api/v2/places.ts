import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';
import {PlacesV2Data} from '../../../types';

const endpoint = 'https://map.naver.com/v5/api/search';

const getData = async (keyword: string, index: number) => {
  const data = await axios.get<PlacesV2Data>(endpoint, {
    params: {
      query: keyword,
      caller: 'pcweb',
      type: 'all',
      page: index,
      displayCount: 40,
      isPlaceRecommendationReplace: true,
      lang: 'ko',
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

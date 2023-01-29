import {Heading, Input} from '@chakra-ui/react';

import {Container} from '../components/Container';
import LoadingLayer from '../components/LoadingLayer';
import {useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {PlacesData, PlacesV2Data, SitesData} from '../types';
import {exportFile, pick, sleep} from '../utils';

const getData = async (keyword: string, index: number) => {
  const res = await axios.get<unknown, AxiosResponse<PlacesV2Data>>('/api/v2/places', {
    params: {
      keyword,
      index,
    },
  });

  return res.data;
};

const Index = () => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container height="100vh">
      {isLoading && <LoadingLayer />}
      <Heading as={'h1'} size={'2xl'} mb={'3rem'}>
        help jino
      </Heading>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            setIsLoading(true);
            const data = await getData(keyword, 1);
            const totalPage = Math.floor(data.result.place.totalCount / 40) + 1;

            const totalItems = [...data.result.place.list];
            for (let i = 1; i < totalPage; i++) {
              await sleep(100);
              const data = await getData(keyword, i);

              if (data.result.place.list.length === 0) {
                break;
              }

              totalItems.push(...data.result.place.list);
            }

            if (totalItems.length === 0) {
              alert('검색 결과가 없습니다.');
              return;
            }

            const result = totalItems.map((item) => {
              const nextItem: any = pick(item, [
                'id',
                'name',
                'category',
                'roadAddress',
                'telDisplay',
              ]);

              return nextItem;
            });

            exportFile(keyword, result);
          } catch (e) {
            console.log(e);
            alert('에러');
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={'키워드를 입력하세요'}
        />
      </form>
    </Container>
  );
};

export default Index;

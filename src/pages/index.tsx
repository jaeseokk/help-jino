import {Heading, Input} from '@chakra-ui/react';

import {Container} from '../components/Container';
import LoadingLayer from '../components/LoadingLayer';
import {useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {PlacesData} from '../types';
import {exportFile, sleep} from '../utils';

const getData = async (keyword: string, index: number) => {
  const res = await axios.get<unknown, AxiosResponse<PlacesData>>('/api/places', {
    params: {
      keyword,
      index,
    },
  });

  const data = res.data;

  return data;
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

            const total = data.restaurantList.total;

            const totalItems = [...data.restaurantList.items];
            for (let i = 2; i <= total; i++) {
              await sleep(100);
              const data = await getData(keyword, i);
              totalItems.push(...data.restaurantList.items);
            }

            if (totalItems.length === 0) {
              alert('검색 결과가 없습니다.');
              return;
            }

            exportFile(keyword, totalItems);
          } catch (e) {
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

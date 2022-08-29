import {Heading, Input} from '@chakra-ui/react';

import {Container} from '../components/Container';
import LoadingLayer from '../components/LoadingLayer';
import {useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {PlacesData, SitesData} from '../types';
import {exportFile, pick, sleep} from '../utils';

const getData = async (keyword: string, index: number) => {
  const res = await axios.get<unknown, AxiosResponse<PlacesData['businesses']>>('/api/places', {
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
            const totalPage = Math.floor(data.total / 40) + 1;

            const totalItems = [...data.items];
            for (let i = 1; i < totalPage; i++) {
              await sleep(100);
              const data = await getData(keyword, i * 40 + 1);

              if (data.items.length === 0) {
                break;
              }

              totalItems.push(...data.items);
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

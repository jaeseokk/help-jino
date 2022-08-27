import {Heading, Input} from '@chakra-ui/react';

import {Container} from '../components/Container';
import LoadingLayer from '../components/LoadingLayer';
import {useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {PlacesData} from '../types';
import {exportFile} from '../utils';

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
            const res = await axios.get<
              unknown,
              AxiosResponse<PlacesData['restaurantList']['items']>
            >('/api/places', {
              params: {
                keyword,
              },
            });

            const data = res.data;

            if (data.length === 0) {
              alert('검색 결과가 없습니다.');
              return;
            }

            exportFile(keyword, res.data);
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

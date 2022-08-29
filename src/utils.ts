import {utils, writeFileXLSX} from 'xlsx';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const exportFile = (keyword: string, data: unknown[]) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Data');
  writeFileXLSX(wb, `${keyword}.xlsx`);
};

export const pick = <T extends Record<K, any>, K extends string>(obj: T, omitKeys: K[]) => {
  return Object.keys(obj)
    .filter((key) => omitKeys.includes(key as K))
    .reduce((res, key) => {
      res[key] = obj[key];
      return res;
    }, {} as Pick<T, K>);
};

import axios from 'axios';

export interface DaoFundStats {
  timestamp: number;
  value: number;
}

const sputnik = axios.create({
  baseURL: 'https://api.app.astrodao.com/api/v1',
});

export async function getDaoFundStats(daoId: string) {
  const url = `/stats/dao/${daoId}/funds`;
  const response = await sputnik.get<DaoFundStats[]>(url);

  return response.data?.length
    ? response.data[response.data.length - 1].value
    : 0;
}

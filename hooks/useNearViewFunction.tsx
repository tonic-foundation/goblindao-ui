import useSWR, { SWRConfiguration } from 'swr';
import { ViewFunctionCallOptions } from 'near-api-js/lib/account';
import { getNearNobody } from '@/lib/services/near';

export default function useNearViewFunction<T = number>(
  viewFnOpts: ViewFunctionCallOptions,
  swrOpts?: Partial<SWRConfiguration>
) {
  return useSWR<T>(
    viewFnOpts,
    async (opts: ViewFunctionCallOptions) => {
      return await getNearNobody().viewFunctionV2(opts);
    },
    swrOpts
  );
}

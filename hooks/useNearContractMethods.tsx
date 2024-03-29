import { useEffect, useState } from 'react';
import { getNearNobody } from '@/lib/services/near';
import { parseContract } from '@tonic-foundation/near-contract-parser';
import { ListBoxItemsProps } from '@/components/Listbox';

export default function useNearContractMethods(smartContract: string) {
  const [methods, setMethods] = useState<ListBoxItemsProps[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { code_base64 }: any =
          await getNearNobody().connection.provider.query({
            account_id: smartContract,
            finality: 'final',
            request_type: 'view_code',
          });

        const parsed = parseContract(code_base64);
        const contractMethods = parsed?.methodNames;
        const mappedMethods = contractMethods?.map((m) => ({
          value: m,
          name: m,
        }));

        setMethods(mappedMethods);
      } catch (e) {
        setMethods([]);
      }
    })();
  }, [smartContract]);

  return methods;
}

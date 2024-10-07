import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/apis';
import { CONTRACT_VIEWS, QUERY_KEYS } from '@/constants';

interface IGetOwnerDebtTokenProps {
  collectionName: string;
  tokenId: string;
}

export const useGetDigitalAssetOwnerDebtTokenQuery = (props: IGetOwnerDebtTokenProps) => {
  const { collectionName, tokenId } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.DA_GET_OWNER_DEBT_TOKEN, collectionName, tokenId],
    queryFn: async () => {
      const client = getApiClient();

      const { data: response } = await client.post(
        '/view',
        {
          function: CONTRACT_VIEWS.GET_OWNER_DEBT_TOKEN,
          type_arguments: [],
          arguments: [collectionName, tokenId],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response;
    },
  });
};

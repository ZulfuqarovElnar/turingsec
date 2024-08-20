import { useQuery } from 'react-query';
import { getMessagesInReport } from '../actions/getMessagesInReport';

export function useGetMessagesInReport(reportId: string) {
  return useQuery(['messages', reportId], () => getMessagesInReport(reportId), {
    enabled: !!reportId, // Only fetch if id is not empty
  });
}

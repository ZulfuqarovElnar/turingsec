import { useQuery } from 'react-query';
import { getAllMessagesInReport } from '../actions/getAllMessagesInReport';

export function useGetAllMessagesInReport(room: string) {
    return useQuery(['messages', room], () => getAllMessagesInReport(room), {
        enabled: !!room, // Only fetch if id is not empty
    });
}

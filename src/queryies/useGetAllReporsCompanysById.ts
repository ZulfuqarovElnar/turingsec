// src/queryies/useGetAllReportsCompanysById.ts
import { useQuery } from 'react-query';
import { getAllReportsCompanysById } from '../actions/getAllReporsCompanysById';

export function useGetAllReportsCompanysById(id: string) {
  return useQuery(['company', id], () => getAllReportsCompanysById(id), {
    enabled: !!id, // Only fetch if id is not empty
  });
}

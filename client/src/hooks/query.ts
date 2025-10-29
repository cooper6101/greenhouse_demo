import { useAuthInfo } from '@propelauth/react';
import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosHeaders } from 'axios';

import { useAlert } from './alert';

type GenericFunction = (...args: any[]) => any;

type FunctionParam<T extends GenericFunction> = T extends (
  ...args: infer U
) => any
  ? U[0] extends { details: infer D }
    ? D
    : never
  : never;

interface UseApiQueryParams<T extends GenericFunction>
  extends UseQueryOptions<Awaited<ReturnType<T>>> {
  queryFn: T;
  params?: FunctionParam<T>;
  queryKey: UseQueryOptions['queryKey'];
  callback?: (unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  showErrorAlert?: boolean;
  showSuccessAlert?: boolean;
  organizationId?: string;
}

export const useApiQuery = <T extends GenericFunction>({
  queryFn,
  params,
  queryKey,
  callback,
  successMessage,
  errorMessage,
  showErrorAlert = true,
  showSuccessAlert = false,
  ...props
}: UseApiQueryParams<T>) => {
  const { addParsedAlert, addAlert } = useAlert();
  const { accessToken } = useAuthInfo();

  const headers: AxiosHeaders = new AxiosHeaders();

  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const query = useQuery<Awaited<ReturnType<T>>>({
    queryKey,
    queryFn: async () =>
      queryFn({
        details: params,
        headers,
      }),
    retry: false,
    ...props,
  });

  if (query.error && showErrorAlert)
    addParsedAlert(
      errorMessage ? errorMessage : (query.error?.message ?? query.error),
      query.error?.message ?? query.error,
      'danger'
    );
  if (query.isSuccess) {
    if (callback) callback(query.data);
    if (successMessage && showSuccessAlert) addAlert(successMessage, 'success');
  }

  return query;
};

interface UseApiMutationParams<T extends GenericFunction>
  extends UseMutationOptions<Awaited<ReturnType<T>>> {
  mutationFn: T;
  queryKey: string[];
  callback?: (unknown) => void;
  successMessage?: string | ((data: Awaited<ReturnType<T>>) => string);
  errorMessage?: string;
  showErrorAlert?: boolean;
  showSuccessAlert?: boolean;
  organizationId?: string;
}

export const useApiMutation = <T extends GenericFunction>({
  mutationFn,
  queryKey,
  callback,
  successMessage,
  errorMessage,
  showErrorAlert = true,
  showSuccessAlert = false,
  ...props
}: UseApiMutationParams<T>) => {
  const queryClient = useQueryClient();
  const { addAlert, addParsedAlert } = useAlert();
  const { accessToken } = useAuthInfo();

  const headers: AxiosHeaders = new AxiosHeaders();

  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const mutation = useMutation({
    mutationFn: async (details: any) => {
      return mutationFn({
        details,
        headers,
      });
    },
    retry: false,
    ...props,
  });

  if (mutation.error && showErrorAlert)
    addParsedAlert(
      errorMessage ? errorMessage : (mutation.error?.message ?? mutation.error),
      mutation.error?.message ?? mutation.error,
      'danger'
    );
  if (mutation.isSuccess) {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey });

    if (callback) callback(mutation.data);
    if (successMessage && showSuccessAlert) addAlert(successMessage, 'success');
  }

  return mutation;
};

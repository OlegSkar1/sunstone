declare type QueryOptions<T> = Omit<
  import('@tanstack/react-query').UseQueryOptions<T>,
  'queryKey'
>;

declare type MutationOptions<TData, TDto = void> = Omit<
  import('@tanstack/react-query').UseMutationOptions<
    TData,
    IResponseError,
    TDto
  >,
  'queryKey'
>;

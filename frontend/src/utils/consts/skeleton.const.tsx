import { Skeleton } from '@nextui-org/react';

export const skeletons = [...Array(9)].map((_, i) => (
  <Skeleton key={i} className="rounded-lg w-[250px] max-sm:w-full">
    <div className="h-72 bg-default-300" />
  </Skeleton>
));

type MethodType = 'POST' | 'GET';

interface FetchConfigProps {
  route: string;
  method: MethodType;
  revalidate?: number;
  body?: any;
}

export const fetchConfig = async <T>({
  route,
  method,
  body,
  revalidate,
}: FetchConfigProps): Promise<T> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${route}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      next: {
        revalidate,
      },
    });

    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

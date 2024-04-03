import { useQuery } from '@tanstack/react-query';

function Query(props) {
  const { keyName, fn, options } = props;
  const { isLoading, data } = useQuery({
    queryKey: keyName,
    queryFn: fn,
    ...options,
  });

  return props.children({ data, isLoading });
}

export default Query;
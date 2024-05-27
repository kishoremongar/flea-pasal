import { Spotlight, spotlight } from '@mantine/spotlight';
import { useState } from 'react';
import SearchIcon from '@@/assets/icons/magnifying-glass.svg';
import { useRouter } from 'next/navigation';
import BackIcon from '@@/assets/icons/arrow-left.svg';
import useGetProductSearch from '@/utils/useGetProductSearch';
import useDebounceValue from '@/utils/useDebounceValue';

export default function SpotlightSearch() {
  const [search, setSearch] = useState('');

  const router = useRouter();
  const debouncedValue = useDebounceValue(search, 300);

  const { data: searchResult } = useGetProductSearch({
    search: debouncedValue,
  });

  const transformedSearch =
    searchResult?.results?.map((item) => {
      return {
        group: item?.group,
        actions: item?.actions?.map((act) => {
          return {
            id: act?.id,
            label: act?.label,
            description: `Sold by ${
              act.company
            } for \u{20B9}${act?.price.toFixed(2)}`,
            image: act?.image?.[0],
            onClick: () => router.push(`/${item?.group}/${act?.id}`),
          };
        }),
      };
    }) ?? [];

  return (
    <div>
      <Spotlight
        actions={transformedSearch}
        nothingFound='Nothing found...'
        highlightQuery
        searchProps={{
          leftSection: (
            <BackIcon
              className='text-primary !w-4 !h-4'
              onClick={spotlight.close}
            />
          ),
          placeholder: 'Search...',
          rightSection: <SearchIcon className='text-primary !w-4 !h-4' />,
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

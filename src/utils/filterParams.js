export const filterParams = (category, searchParams) => {
  const priceRange = searchParams.get('price')?.split(',');

  const queryParams = {
    category,
    ...(searchParams.has('price') && {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }),
    ...(searchParams.has('sort') &&
      searchParams.get('sort') !== 'All' && {
        sort: searchParams.get('sort'),
      }),
    ...(searchParams.has('selectedCategory') &&
      searchParams.get('selectedCategory') !== 'All' && {
        selectedCategory: searchParams.get('selectedCategory'),
      }),
    ...(searchParams.has('company') &&
      searchParams.get('company') !== 'All' && {
        company: searchParams.get('company'),
      }),
  };

  return queryParams;
};

import { Spotlight } from '@mantine/spotlight';

export default function SpotlightSearch() {
  const actions = [
    {
      group: 'Pages',
      actions: [
        {
          id: 'home',
          label: 'Home page',
          description: 'Where we present the product',
        },
        {
          id: 'careers',
          label: 'Careers page',
          description: 'Where we list open positions',
        },
        {
          id: 'about-us',
          label: 'About us page',
          description: 'Where we tell what we do',
        },
      ],
    },

    {
      group: 'Apps',
      actions: [
        {
          id: 'svg-compressor',
          label: 'SVG compressor',
          description: 'Compress SVG images',
        },
        {
          id: 'base64',
          label: 'Base 64 converter',
          description: 'Convert data to base 64 format',
        },
        {
          id: 'fake-data',
          label: 'Fake data generator',
          description: 'Lorem ipsum generator',
        },
      ],
    },
  ];
  return (
    <div>
      <Spotlight
        actions={actions}
        nothingFound='Nothing found...'
        highlightQuery
        // searchProps={{
        //   leftSection: (
        //     <IconSearch
        //       style={{ width: rem(20), height: rem(20) }}
        //       stroke={1.5}
        //     />
        //   ),
        //   placeholder: 'Search...',
        // }}
      />
    </div>
  );
}

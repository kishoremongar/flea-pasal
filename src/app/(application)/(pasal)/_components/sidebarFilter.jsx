'use client';

import { RangeSlider, Select } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DownArrowIcon from '@@/assets/icons/selectArrow.svg';
import useGetFilterData from '../_hooks/useGetFilterData';
import PrimaryButton from '@/components/common/primaryButton';
import PageLoadingOverlay from '@/components/common/pageLoadingOverlay';

export default function SidebarFilter({ handleClose = () => {} }) {
  const [value, setValue] = useState([0, 500]);
  const [endValue, setEndValue] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('All');
  const [selectCategory, setSelectCategory] = useState('All');
  const [selectCompany, setSelectCompany] = useState('All');
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const { data: getFilterData, isPending: filterFetching } = useGetFilterData({
    category: pathName.split('/')[1],
  });

  const maxPrice = Math.round(getFilterData?.highestPrice) ?? 500;

  const getAllCompanies = getFilterData?.companies
    ? ['All', ...getFilterData.companies]
    : ['All'];
  const getAllCategories = getFilterData?.subcategories
    ? ['All', ...getFilterData.subcategories]
    : ['All'];

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleResetAll = () => {
    setEndValue([0, value[1]]);
    setValue([0, value[1]]);
    setSelectCompany('All');
    setSelectCategory('All');
    setSortBy('All');
    router.push(pathName);
  };

  useEffect(() => {
    if (!getFilterData?.highestPrice) return;
    handleResetAll();
    const roundedHighestValue = Math.round(getFilterData?.highestPrice);
    setValue([0, roundedHighestValue]);
    setEndValue([0, roundedHighestValue]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFilterData?.highestPrice]);

  return (
    <div className='flex flex-col gap-y-6 pt-6 md:py-6 relative'>
      <h1 className='text-xl font-medium text-olive'>Filter options</h1>
      {filterFetching ? (
        <PageLoadingOverlay />
      ) : (
        <>
          <div className='flex flex-auto flex-col gap-y-4'>
            <p className='text-olive'>
              Select pricing range{' '}
              {`\u{20B9}${endValue[0]}-\u{20B9}${endValue[1]}`}
            </p>
            <RangeSlider
              value={value}
              onChange={setValue}
              min={0}
              mb='xl'
              max={maxPrice}
              label={(value) => `\u{20B9}${value}`}
              marks={[
                { value: 0, label: '\u{20B9}0' },
                {
                  value: Math.round(getFilterData?.highestPrice / 2),
                  label: `\u{20B9}${Math.round(
                    getFilterData?.highestPrice / 2
                  )}`,
                },
                {
                  value: maxPrice,
                  label: `\u{20B9}${maxPrice}`,
                },
              ]}
              classNames={{ label: '!bg-olive' }}
              onChangeEnd={(e) => {
                setEndValue(e);
                router.push(`${pathName}?${createQueryString('price', e)}`);
              }}
            />
          </div>
          <div>
            <Select
              placeholder='Select sorting type'
              data={['All', 'a-z', 'z-a', 'high', 'low']}
              onChange={(e) => {
                setSortBy(e);
                router.push(`${pathName}?${createQueryString('sort', e)}`);
              }}
              value={sortBy}
              allowDeselect={false}
              label='Sort by'
              rightSection={
                <DownArrowIcon className='cursor-pointer text-stone hover:text-primary w-4 h-4' />
              }
              classNames={{
                input: '!h-[2.75rem] !text-secondary',
                label: '!text-olive !font-normal',
              }}
            />
          </div>
          <div>
            <Select
              placeholder='Select category'
              data={getAllCategories}
              allowDeselect={false}
              value={selectCategory}
              onChange={(e) => {
                setSelectCategory(e);
                router.push(
                  `${pathName}?${createQueryString('selectedCategory', e)}`
                );
              }}
              label='Select category'
              rightSection={
                <DownArrowIcon className='cursor-pointer text-stone hover:text-primary w-4 h-4' />
              }
              classNames={{
                input: '!h-[2.75rem] !text-secondary',
                label: '!text-olive !font-normal',
              }}
            />
          </div>
          <div>
            <Select
              placeholder='Select company'
              data={getAllCompanies}
              allowDeselect={false}
              value={selectCompany}
              onChange={(e) => {
                setSelectCompany(e);
                router.push(`${pathName}?${createQueryString('company', e)}`);
              }}
              label='Select company'
              rightSection={
                <DownArrowIcon className='cursor-pointer text-stone hover:text-primary w-4 h-4' />
              }
              classNames={{
                input: '!h-[2.75rem] !text-secondary',
                label: '!text-olive !font-normal',
              }}
            />
          </div>
        </>
      )}
      <div className='w-full py-5 md:block flex gap-x-4 md:gap-x-0 md:py-10'>
        <div className='flex gap-x-4 md:gap-x-0 md:hidden'>
          <PrimaryButton
            rootClassName='!w-full'
            titleClassName='!text-base !font-normal'
            type='button'
            variant='outline'
            onClick={handleClose}
          >
            Close
          </PrimaryButton>
          <PrimaryButton
            rootClassName='!w-full'
            titleClassName='!text-base !font-normal'
            type='button'
            onClick={handleResetAll}
          >
            Reset
          </PrimaryButton>
        </div>
        <div className='md:block hidden'>
          <PrimaryButton
            rootClassName='!w-full'
            titleClassName='!text-base !font-normal'
            type='button'
            onClick={handleResetAll}
          >
            Reset all
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

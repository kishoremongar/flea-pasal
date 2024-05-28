'use client';

import { RangeSlider, Select } from '@mantine/core';
import { useState } from 'react';
import DownArrowIcon from '@@/assets/icons/selectArrow.svg';
import PrimaryButton from '@/components/common/primaryButton';

export default function SidebarFilter() {
  const [value, setValue] = useState([0, 500]);
  const [endValue, setEndValue] = useState([0, 500]);

  const handleResetAll = () => {
    setEndValue([0, 500]);
    setValue([0, 500]);
  };

  return (
    <div className='flex flex-col gap-y-6 py-6 relative'>
      <h1 className='text-xl font-medium text-olive'>Filter options</h1>
      <div className='flex flex-auto flex-col gap-y-4'>
        <p className='text-olive'>
          Select pricing range ${endValue[0]}-${endValue[1]}
        </p>
        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          mb='xl'
          max={500}
          label={(value) => `\u{20B9}${value}`}
          marks={[
            { value: 0, label: '\u{20B9}0' },
            { value: 250, label: '\u{20B9}250' },
            { value: 500, label: '\u{20B9}500' },
          ]}
          classNames={{ label: '!bg-olive' }}
          onChangeEnd={setEndValue}
        />
      </div>
      <div>
        <Select
          placeholder='Select sorting type'
          data={['All', 'a-z', 'z-a', 'high', 'low']}
          defaultValue='All'
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
          data={['All', 'jeans', 'shirt', 'pants', 'novella']}
          allowDeselect={false}
          defaultValue='All'
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
          data={['All', 'adidas', 'nike', 'puma']}
          allowDeselect={false}
          defaultValue='All'
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
      <div className='w-full py-10'>
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
  );
}

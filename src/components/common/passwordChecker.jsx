import { Box, Popover, Progress, rem, Text } from '@mantine/core';
import React, { useState } from 'react';
import IconCheck from '@@/assets/icons/correct-success.svg';
import IconX from '@@/assets/icons/cross-red.svg';

export default function PasswordChecker({
  primaryColorValue = '#4CD349',
  mainWatch,
  children,
}) {
  const [popoverOpened, setPopoverOpened] = useState(false);

  const borderPrimaryColor = primaryColorValue;

  function PasswordRequirement({ meets, label }) {
    return (
      <Text
        c={meets ? borderPrimaryColor : 'red'}
        style={{ display: 'flex', alignItems: 'center', padding: '2px 0' }}
        mt={7}
        size='sm'
      >
        {meets ? (
          <IconCheck style={{ width: rem(16), height: rem(16) }} />
        ) : (
          <IconX style={{ width: rem(15), height: rem(15) }} />
        )}{' '}
        <Box ml={10}>{label}</Box>
      </Text>
    );
  }

  const requirements = [
    { re: /.{8,}/, label: 'Includes 8 characters' },
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
  ];

  function getStrength(password) {
    let multiplier = password?.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });
    const mainData = (100 / (requirements.length + 1)) * multiplier;
    return Math.max(100 - mainData, 10);
  }

  const strength = getStrength(mainWatch);
  let color;

  if (strength === 100) {
    color = borderPrimaryColor;
  } else if (strength > 50) {
    color = 'yellow';
  } else {
    color = 'red';
  }

  const checks = requirements.map((requirement) => (
    <PasswordRequirement
      key={requirement.label}
      label={requirement.label}
      meets={requirement.re.test(mainWatch)}
    />
  ));
  return (
    <Popover
      opened={popoverOpened}
      position='bottom'
      width='target'
      transitionProps={{ transition: 'pop' }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          {children}
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb='xs' />
        {/* <PasswordRequirement
          label='Includes at least 8 characters'
          meets={mainWatch?.length > 7}
        /> */}
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}

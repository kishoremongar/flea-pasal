import { Drawer } from '@mantine/core';
import SidebarFilter from './sidebarFilter';

export default function FilterModal({ opened, toggle }) {
  const handleClose = () => {
    toggle();
  };
  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      centered
      overlayProps={{ backgroundOpacity: 0.1, blur: 3 }}
      withCloseButton={false}
      size={'50rem'}
      offset={50}
      radius='md'
      position='bottom'
      classNames={{
        overlay: '!top-[4rem]',
        inner: '!top-[7rem]',
        body: '!px-[2rem] !p-0',
      }}
    >
      <SidebarFilter handleClose={handleClose} />
    </Drawer>
  );
}

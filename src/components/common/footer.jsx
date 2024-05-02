import { Container, Group, Text } from '@mantine/core';
import Link from 'next/link';
import MainLogo from '../../../public/assets/icons/logo.svg';
import classes from '../style-modules/footerLinks.module.css';

const data = [
  {
    title: 'Pasal',
    links: [
      { label: 'Apparel', link: '/pasal/apparel' },
      { label: 'Shoes', link: '/pasal/shoes' },
      { label: 'Krafts', link: '/pasal/krafts' },
      { label: 'Books', link: '/pasal/books' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'About', link: '#' },
      { label: 'Blogs', link: '#' },
      { label: 'Careers', link: '#' },
      { label: 'Newsletter', link: '#' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', link: '#' },
      { label: 'Contact Us', link: '#' },
      { label: 'T&C', link: '#' },
      { label: 'Shipping', link: '#' },
    ],
  },
];

export function FooterLayout() {
  const groups = data.map((group) => {
    const links = group.links.map((link) => (
      <Text
        key={link.label}
        className={`${classes.link} hover:underline`}
        component='a'
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={`${classes.wrapper}`} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  const currentYear = new Date().getFullYear();
  return (
    <footer
      className={classes.footer}
      style={{ backgroundColor: '#3E362E', color: '#b6a497' }}
    >
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <MainLogo />
          <Text
            size='xs'
            className={classes.description}
            style={{ color: '#b6a497' }}
          >
            Eco-friendly styling, sustainable yet <br /> stylish and a fashion
            statement.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text size='sm' style={{ color: '#b6a497' }}>
          © {currentYear} All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify='flex-end'
          wrap='nowrap'
          classNames={{ root: '!text-secondary' }}
        >
          <Link href='#' target='_blank'>
            Instagram
          </Link>
          <Link href='#' target='_blank'>
            Pinterest
          </Link>
          <Link href='#' target='_blank'>
            Twitter
          </Link>
        </Group>
      </Container>
    </footer>
  );
}

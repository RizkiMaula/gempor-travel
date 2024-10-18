import { Collapse, Typography, List, ListItem, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Bars4Icon, ReceiptPercentIcon, FaceSmileIcon, MoonIcon, SquaresPlusIcon, SunIcon, UserGroupIcon, TagIcon } from '@heroicons/react/24/solid';
import { useState, createElement, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMode } from '../../redux/slices/darkSlice';
import { Link } from 'react-router-dom';

const navListMenuItems = [
  {
    title: 'Dashboard',
    description: 'Find the perfect solution for your needs.',
    icon: SquaresPlusIcon,
    link: '/admin/',
  },
  {
    title: 'Activity',
    description: 'Meet and learn about our dedication',
    icon: FaceSmileIcon,
    link: '/admin/activity',
  },
  {
    title: 'Banner',
    description: 'Find the perfect solution for your needs.',
    icon: Bars4Icon,
    link: '/admin/banner',
  },
  {
    title: 'Category',
    description: 'Reach out to us for assistance or inquiries',
    icon: TagIcon,
    link: '/admin/Categories',
  },
  {
    title: 'Promo',
    description: 'Learn how we can help you achieve your goals.',
    icon: ReceiptPercentIcon,
    link: '/admin/promos',
  },
  {
    title: 'User',
    description: 'Reach out to us for assistance or inquiries',
    icon: UserGroupIcon,
    link: '/admin/users',
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const renderItems = navListMenuItems.map(({ icon, title, link }, key) => (
    <Link
      to={link}
      key={key}
    >
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          {' '}
          {createElement(icon, {
            strokeWidth: 2,
            className: 'h-6 text-gray-900 w-6',
          })}
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm font-bold"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </Link>
  ));

  return (
    <Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            as="div"
            variant="small"
            className="font-medium"
          >
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900 dark:text-lightTextColor"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Menus
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? 'rotate-180' : ''}`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? 'rotate-180' : ''}`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </Fragment>
  );
}

const NavList = () => {
  // redux
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.darkMode);
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="/"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2  dark:text-lightTextColor py-2 pr-4">Home</ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem
          className="flex items-center gap-2 py-2 pr-4"
          onClick={() => {
            dispatch(toggleMode());
          }}
        >
          {' '}
          {mode.darkMode ? <MoonIcon className="w-5 h-5 dark:text-lightTextColor" /> : <SunIcon className="w-5 h-5" />}
        </ListItem>
      </Typography>
    </List>
  );
};

export { NavList, NavListMenu };

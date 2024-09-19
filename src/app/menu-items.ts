import { MenuItem } from "./shared/models/menuitem";

export const menuItems: MenuItem[] = [
    {
      path: '',
      icon: 'home',
      label: 'Dashboard'
    },
    {
      path: '/person',
      icon: 'groups',
      label: 'Persons'
    },
    // {
    //   path: '',
    //   icon: 'list_alt',
    //   label: 'Hakkımızda',
    //   subItems: [
    //     {
    //       path: '',
    //       icon: 'home',
    //       label: 'Haberler'
    //     },
    //     {
    //       path: '/dashboard',
    //       icon: 'list_alt',
    //       label: 'Tesisler'
    //     }
    //   ]
    // }
  ];
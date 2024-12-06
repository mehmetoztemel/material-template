import { MenuItem } from "./shared/models/menuitem";

export const menuItems: MenuItem[] = [
  {
    path: '/dashboard',
    icon: 'home',
    label: 'Dashboard'
  },
  {
    path: '/person',
    icon: 'groups',
    label: 'Persons'
  }
  , {
    path: '',
    icon: 'list_alt',
    label: 'Hakkımızda',
    subItems: [
      {
        path: '',
        icon: 'home',
        label: 'Haberler Hakkımızda'
      },
      {
        path: '',
        icon: 'list_alt',
        label: 'Tesisler',
        subItems: [
          {
            path: '',
            icon: 'home',
            label: 'Haberler'
          },
          {
            path: '/dashboard',
            icon: 'list_alt',
            label: 'Tesisler'
          }
        ]
      }
    ]
  }
];
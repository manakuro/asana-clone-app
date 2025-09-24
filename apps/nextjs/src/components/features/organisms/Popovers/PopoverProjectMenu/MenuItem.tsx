import {
  MenuItem as AtomsMenuItem,
  type MenuItemProps,
} from '@/components/ui/Menu';
import type React from 'react';

export const MenuItem: React.FC<MenuItemProps> = (props) => (
  <AtomsMenuItem fontSize="sm" iconSpacing={3} {...props} />
);

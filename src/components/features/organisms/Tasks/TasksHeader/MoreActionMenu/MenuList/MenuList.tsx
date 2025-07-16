import { memo } from 'react'
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from 'src/components/ui/organisms/Menu'

export const MenuList = memo(function MenuList() {
  return (
    <AtomsMenuList>
      <MenuItem isDisabled>Save layout as default</MenuItem>
    </AtomsMenuList>
  )
})

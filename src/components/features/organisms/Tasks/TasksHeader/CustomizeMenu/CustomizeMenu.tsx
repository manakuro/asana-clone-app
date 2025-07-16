import type React from 'react'
import { Drawer } from 'src/components/ui/organisms/Drawer'
import { Content } from './Content'
import { useCustomizeMenu } from './useCustomizeMenu'

export const CustomizeMenu: React.FC = () => {
  const { isOpen, onClose } = useCustomizeMenu()

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      {isOpen && <Content />}
    </Drawer>
  )
}

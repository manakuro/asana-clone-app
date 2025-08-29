import { Portal } from '@/components/ui/atoms';
import {
  MenuList as AtomsMenuList,
  MenuDivider,
} from '@/components/ui/organisms/Menu';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDisclosure } from '@/shared/chakra';
import { useCallback } from 'react';
import { AddToPortfolio } from './AddToPortfolio';
import { Archive } from './Archive';
import { ConvertToTemplate } from './ConvertToTemplate';
import { CopyProjectLink } from './CopyProjectLink';
import { DeleteProject } from './DeleteProject';
import { Duplicate } from './Duplicate';
import { EditProjectDetails } from './EditProjectDetails';
import { ExportAndPrint } from './ExportAndPrint';
import { Import } from './Import';
import { SaveLayoutAsDefault } from './SaveLayoutAsDefault';
import { SetColorAndIcon } from './SetColorAndIcon';

type Props = {
  onCloseMenu: () => void;
  projectId: string;
};

export function MenuList(props: Props) {
  const { projectId } = props;
  const disclosureForPopoverSetColorAndIcon = useDisclosure();
  const disclosureForPopoverImportActions = useDisclosure();
  const disclosureForPopoverExportAndPrintActions = useDisclosure();
  const { ref } = useClickOutside<HTMLDivElement>(() => {
    handleCloseAll();
  });

  const handleClose = useCallback(() => {
    disclosureForPopoverSetColorAndIcon.onClose();
    disclosureForPopoverImportActions.onClose();
    disclosureForPopoverExportAndPrintActions.onClose();
  }, [
    disclosureForPopoverImportActions,
    disclosureForPopoverExportAndPrintActions,
    disclosureForPopoverSetColorAndIcon,
  ]);

  const handleCloseAll = useCallback(() => {
    handleClose();
    props.onCloseMenu();
  }, [handleClose, props]);

  const handleOpenPopoverSetColorAndIcon = useCallback(() => {
    handleClose();

    disclosureForPopoverSetColorAndIcon.onOpen();
  }, [disclosureForPopoverSetColorAndIcon, handleClose]);

  const handleOpenPopoverImportActions = useCallback(() => {
    handleClose();

    disclosureForPopoverImportActions.onOpen();
  }, [disclosureForPopoverImportActions, handleClose]);

  const handleOpenPopoverExportAndPrintActions = useCallback(() => {
    handleClose();

    disclosureForPopoverExportAndPrintActions.onOpen();
  }, [disclosureForPopoverExportAndPrintActions, handleClose]);

  return (
    <Portal>
      <AtomsMenuList ref={ref} zIndex={1}>
        <EditProjectDetails
          projectId={projectId}
          onClose={handleCloseAll}
          onMouseEnter={handleClose}
        />
        <SetColorAndIcon
          projectId={projectId}
          onClose={handleCloseAll}
          onMouseEnter={handleOpenPopoverSetColorAndIcon}
          isOpen={disclosureForPopoverSetColorAndIcon.isOpen}
        />
        <MenuDivider />
        <CopyProjectLink
          onClose={handleCloseAll}
          onMouseEnter={handleClose}
          projectId={projectId}
        />
        <SaveLayoutAsDefault
          onClose={handleCloseAll}
          onMouseEnter={handleClose}
          projectId={projectId}
        />
        <Duplicate
          onClose={handleCloseAll}
          onMouseEnter={handleClose}
          projectId={projectId}
        />
        <ConvertToTemplate
          onClose={handleCloseAll}
          onMouseEnter={handleClose}
          projectId={projectId}
        />
        <AddToPortfolio
          onClose={handleCloseAll}
          onMouseEnter={handleClose}
          projectId={projectId}
        />
        <MenuDivider />
        <Import
          onClose={handleCloseAll}
          onMouseEnter={handleOpenPopoverImportActions}
          isOpen={disclosureForPopoverImportActions.isOpen}
          projectId={projectId}
        />
        <ExportAndPrint
          onClose={handleCloseAll}
          onMouseEnter={handleOpenPopoverExportAndPrintActions}
          isOpen={disclosureForPopoverExportAndPrintActions.isOpen}
          projectId={projectId}
        />
        <Archive
          onClose={handleCloseAll}
          onMouseEnter={handleClose}
          projectId={projectId}
        />
        <DeleteProject
          onClose={handleCloseAll}
          onMouseEnter={handleClose}
          projectId={projectId}
        />
      </AtomsMenuList>
    </Portal>
  );
}

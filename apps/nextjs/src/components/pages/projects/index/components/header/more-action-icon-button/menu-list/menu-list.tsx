import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { AddToPortfolio } from './add-to-portfolio';
import { Archive } from './archive';
import { ConvertToTemplate } from './convert-to-template';
import { CopyProjectLink } from './copy-project-link';
import { DeleteProject } from './delete-project';
import { Duplicate } from './duplicate';
import { EditProjectDetails } from './edit-project-details';
import { ExportAndPrint } from './export-and-print';
import { Import } from './import';
import { SaveLayoutAsDefault } from './save-layout-as-default';
import { SetColorAndIcon } from './set-color-and-icon';

type Props = {
  projectId: string;
};

export function MenuList(props: Props) {
  const { projectId } = props;

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <EditProjectDetails projectId={projectId} />
          <SetColorAndIcon projectId={projectId} />
          <Menu.Separator />
          <CopyProjectLink projectId={projectId} />
          <SaveLayoutAsDefault />
          <Duplicate />
          <ConvertToTemplate />
          <AddToPortfolio />
          <Menu.Separator />
          <Import />
          <ExportAndPrint />
          <Archive />
          <DeleteProject />
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
}

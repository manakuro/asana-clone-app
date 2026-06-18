import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
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

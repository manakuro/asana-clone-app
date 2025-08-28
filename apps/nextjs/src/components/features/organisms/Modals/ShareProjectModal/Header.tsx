import { ModalHeader } from '@/components/ui/organisms/Modal';
import { useProject } from '@/store/entities/project';
import { memo } from 'react';

type Props = {
  projectId: string;
};

export const Header = memo(function Header(props: Props) {
  const { project } = useProject(props.projectId);

  return <ModalHeader>Share {project.name}</ModalHeader>;
});

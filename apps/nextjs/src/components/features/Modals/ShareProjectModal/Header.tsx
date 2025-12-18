import { memo } from 'react';
import { ModalHeader } from '@/components/ui/Modal';
import { useProject } from '@/store/entities/project';

type Props = {
  projectId: string;
};

export const Header = memo(function Header(props: Props) {
  const { project } = useProject(props.projectId);

  return <ModalHeader>Share {project.name}</ModalHeader>;
});

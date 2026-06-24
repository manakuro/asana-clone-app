import { useRouter as useRouterNext } from 'next/navigation';
import { useRouterHome } from './home';
import { useRouterInbox } from './inbox';
import { useRouterMyTasks } from './my-tasks';
import { useRouterProjects } from './projects';
import { useRouterWorkspace } from './workspace';

export const useRouter = () => {
  const router = useRouterNext();
  return {
    ...useRouterHome(),
    ...useRouterInbox(),
    ...useRouterMyTasks(),
    ...useRouterProjects(),
    ...useRouterWorkspace(),
    router,
  };
};

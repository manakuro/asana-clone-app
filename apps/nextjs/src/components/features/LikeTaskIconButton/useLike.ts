import { useMe } from '@/store/entities/me';
import { useTaskLikesByTaskId } from '@/store/entities/taskLike';
import { useTeammates } from '@/store/entities/teammate';
import { useCallback, useMemo } from 'react';

type Props = {
  taskId: string;
};

export const useLike = (props: Props) => {
  const { taskId } = props;
  const { getTeammatesById } = useTeammates();
  const { taskLikes, teammateIds, addTaskLike, deleteTaskLike } =
    useTaskLikesByTaskId(taskId);
  const { me } = useMe();

  const likeLength = useMemo(() => taskLikes.length, [taskLikes]);
  const hasAnyoneLiked = useMemo(() => !!taskLikes.length, [taskLikes]);

  const teammates = useMemo(
    () => getTeammatesById(teammateIds),
    [getTeammatesById, teammateIds],
  );

  const teammateNames = useMemo(() => {
    return [
      ...teammates.filter((t) => t.id === me.id),
      ...teammates.filter((t) => t.id !== me.id),
    ].map((t) => {
      return t.id === me.id ? 'You' : t.name;
    });
  }, [me.id, teammates]);

  const label = useMemo(() => {
    const names =
      teammateNames.length > 2
        ? [...teammateNames.slice(0, 2), 'others']
        : teammateNames;

    return `${names.join(' and ')} liked this`;
  }, [teammateNames]);

  const onToggleLike = useCallback(() => {
    const isLiked = taskLikes.some(
      (f) => f.teammateId === me.id && f.taskId === taskId,
    );

    isLiked ? deleteTaskLike(me.id) : addTaskLike(me.id);
  }, [taskLikes, deleteTaskLike, me.id, addTaskLike, taskId]);

  return {
    label,
    likeLength,
    hasAnyoneLiked,
    onToggleLike,
  };
};

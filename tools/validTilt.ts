import { Tilt } from '@/types';

export const validTilt = ({ percentX, percentY, rotateX, rotateY }: Tilt) =>
	percentX >= 0 && percentY >= 0 && !!rotateX && !!rotateY;

import { Tilt } from '@/types';

export const validTilt = (tilt: Tilt) => {
	if (!tilt) return false;

	const { percentX, percentY, rotateX, rotateY } = tilt;

	return percentX >= 0 && percentY >= 0 && !!rotateX && !!rotateY;
};

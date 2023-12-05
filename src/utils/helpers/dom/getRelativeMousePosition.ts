import { MouseEvent as ReactMouseEvent } from 'react';

export default function getRelativeMousePosition(
  e: ReactMouseEvent | MouseEvent,
  t?: HTMLElement
) {
  const target = t || (e.target as HTMLElement);

  const bounds = target.getBoundingClientRect();

  const x = (e.clientX - bounds.left) / target.clientWidth;
  const y = (e.clientY - bounds.top) / target.clientHeight;

  return { x, y };
}

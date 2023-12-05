import { ReactNode } from 'react';

export default function TourBody({ content }: { content: ReactNode }) {
  return <div className='text-lg max-w-[370px]'>{content}</div>;
}

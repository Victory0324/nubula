import type { SVGProps } from 'react';
const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M20.7188 19.5586C21.0703 19.9102 21.0703 20.4375 20.7188 20.7539C20.5781 20.9297 20.3672 21 20.1562 21C19.9102 21 19.6992 20.9297 19.5234 20.7539L14.8125 16.043C13.5469 17.0625 11.9648 17.625 10.2773 17.625C6.26953 17.625 3 14.3555 3 10.3125C3 6.30469 6.23438 3 10.2773 3C14.2852 3 17.5898 6.30469 17.5898 10.3125C17.5898 12.0352 17.0273 13.6172 16.0078 14.8477L20.7188 19.5586ZM4.6875 10.3125C4.6875 13.4414 7.18359 15.9375 10.3125 15.9375C13.4062 15.9375 15.9375 13.4414 15.9375 10.3125C15.9375 7.21875 13.4062 4.6875 10.3125 4.6875C7.18359 4.6875 4.6875 7.21875 4.6875 10.3125Z'
      fill='currentColor'
      fillOpacity={0.9}
    />
  </svg>
);
export default Search;
interface MobileTrayProps {
  children?: React.ReactNode;
  isTrayOpen?: boolean;
}

const MobileTray: React.FC<MobileTrayProps> = ({ children, isTrayOpen }) => {
  return (
    <div
      className={`
          flex
          lg:hidden

          flex-col
          fixed
          grow

          bg-gray-13 
          lg:bg-transparent
          fill-available


          h-full
          w-full
          mr-5
          pr-[45px]

          transition-opacity duration-500
          mb-5
          pb-5 lg:pb-0

          ${isTrayOpen ? 'opacity-100 z-10' : 'opacity-0 invisible'}

          overflow-hidden
        `}
    >
      <div
        className='
            rounded-2xl


            border-l
            border-r
            border-b
            border-t
            border-gray-999
            bg-gray-13

            mb-10

            pt-2 lg:pt-[90px]
            px-5
            pb-5

            h-full

            flex
            flex-col
            justify-between
            overflow-y-scroll
            no-scrollbar
          '
      >
        {children}
      </div>
    </div>
  );
};

export default MobileTray;

import KorusLogo from './assets/KorusLogo';

const DesktopKorusLogo = () => (
  <div
    className='
      hidden
      absolute
      lg:flex

      w-full
      left-0

      border-solid
      border-l-none
      border-r
      border-gray-999

      relative
      header-logo

      rounded-2xl
      rounded-br-none

      z-10
  '
  >
    <div
      className='
                p-5
                border-solid

                border-b
                border-r
                border-gray-999

                rounded-2xl
                rounded-tr-none
                logo-border-left
                logo-border-top'
    >
      <KorusLogo />
    </div>

    <div
      className='
                w-full
                p-5
                border-solid

                border-t
                border-gray-999

                rounded-xl
                rounded-br-none
            '
    ></div>
  </div>
);

export default DesktopKorusLogo;

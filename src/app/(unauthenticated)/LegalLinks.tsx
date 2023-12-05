export default function LegalLinks() {
  return (
    <div className='w-full px-7 text-2xs text-center mt-5 text-gray-b7'>
      View our{' '}
      <a
        className='text-white hover:text-tiffany-9e transition-colors'
        target='_blank'
        href='https://pixelynx.io/terms-and-conditions'
      >
        Terms & Conditions
      </a>{' '}
      and{' '}
      <a
        className='text-white hover:text-tiffany-9e transition-colors'
        target='_blank'
        href='https://pixelynx.io/privacy-policy'
      >
        Privacy Policy
      </a>
    </div>
  );
}

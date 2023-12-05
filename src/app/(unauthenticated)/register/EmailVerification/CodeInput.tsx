import { createRef, useCallback, useMemo } from 'react';

const EmailVerificationInput: React.FC<{
  setVerificationCode: (str: string) => void;
  onFilled?: (code: string) => void;
}> = ({ setVerificationCode, onFilled }) => {
  const refs = Array.from({ length: 6 }, (_) => createRef<HTMLInputElement>());

  const concatVerificationCode = useCallback(() => {
    let vc = '';

    refs.forEach((ref) => {
      vc += ref.current?.value;
    });

    setVerificationCode(vc);
    if (vc.length === 6) onFilled && onFilled(vc);
  }, [onFilled, refs, setVerificationCode]);

  const inputs = useMemo(
    () =>
      refs.map((ref, i) => {
        return (
          <input
            ref={ref}
            onPaste={(event) => {
              const text = event.clipboardData.getData('Text');
              text.split('').map((char, j) => {
                // If the user pastes more chars than input
                // we insert chars until we run out of
                // inputs and focus on last one.
                // Note: the extra index (i) is to handle when a
                // user pastes into an input other than the first.
                const ref = refs[i + j]?.current;
                if (ref) {
                  ref.focus();
                  ref.value = char;
                }
              });

              concatVerificationCode();
            }}
            key={i}
            className='
            verify
            flex
            w-full
            bg-transparent
            rounded-2xl
            border
            border-gray-53
            py-2
            text-center
          '
            placeholder='-'
            maxLength={1}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={(e) => {
              if (e.target.value.length === 0 && e.target.previousSibling) {
                (e.target.previousSibling as HTMLInputElement).focus();
              } else if (e.target.value.length === 1 && e.target.nextSibling) {
                (e.target.nextSibling as HTMLInputElement).focus();
              }

              concatVerificationCode();
            }}
          />
        );
      }),
    [concatVerificationCode, refs]
  );

  return <div className='flex w-full justify-between px-5 mt-5'>{inputs}</div>;
};

export default EmailVerificationInput;

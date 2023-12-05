import type { SVGProps } from 'react';
const CartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M2.84142 3H4.41909C5.19039 3 5.89157 3.45644 6.2071 4.12354H20.6164C21.528 4.12354 22.1941 5.00131 21.9487 5.91419L20.5113 11.251C20.2308 12.3746 19.2141 13.1119 18.0922 13.1119H7.96006L8.17042 14.1301C8.24054 14.5163 8.59113 14.7972 8.97678 14.7972H19.1089C19.5647 14.7972 19.9503 15.1834 19.9503 15.6398C19.9503 16.1314 19.5647 16.4825 19.1089 16.4825H8.97678C7.78477 16.4825 6.73299 15.6398 6.52264 14.4461L4.69956 4.93109C4.6645 4.79064 4.55932 4.68531 4.41909 4.68531H2.84142C2.35059 4.68531 2 4.33421 2 3.84266C2 3.38622 2.35059 3 2.84142 3ZM6.59276 5.80885L7.64453 11.4266H18.0922C18.4778 11.4266 18.7934 11.1808 18.8985 10.8297L20.2308 5.80885H6.59276ZM8.17042 20.9767C7.53935 20.9767 7.01347 20.6607 6.69793 20.134C6.03181 19.0105 6.87323 17.606 8.17042 17.606C8.76643 17.606 9.29231 17.9572 9.60785 18.4487C10.274 19.5722 9.43255 20.9767 8.17042 20.9767ZM19.9503 19.2914C19.9503 19.9233 19.5997 20.45 19.1089 20.766C17.987 21.4331 16.5846 20.5905 16.5846 19.2914C16.5846 18.6945 16.9002 18.1678 17.4261 17.8518C18.5479 17.1847 19.9503 18.0274 19.9503 19.2914Z'
      fill='currentColor'
      fillOpacity={0.9}
    />
  </svg>
);
export default CartIcon;

import { SVGProps } from "react";

export function HorizontalLines(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="146" height="146" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="25" width="24" height="2" fill="#9EA3B3" />
      <rect x="25" y="144" width="24" height="2" fill="#9EA3B3" />
      <rect x="49" y="24" width="24" height="2" fill="#9EA3B3" />
      <rect x="49" y="120" width="24" height="2" fill="#9EA3B3" />
      <rect x="73" y="48" width="24" height="2" fill="#9EA3B3" />
      <rect x="73" y="96" width="24" height="2" fill="#9EA3B3" />
      <rect x="97" y="72" width="24" height="2" fill="#9EA3B3" />
    </svg>
  );
}

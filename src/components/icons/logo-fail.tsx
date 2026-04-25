import * as React from "react";
import {memo} from "react";

export const LogoFail = memo(({
  size = 24,
  color,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
}) => {
  const stop0Color = color || "#f40272";
  const stop1Color = color || "#871257";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 1395 1395"
      className={className}
      {...props}
    >
      <path fill="none" d="M0 -1444.9h1394.9V-50H0z" transform="translate(0 1444.9)" />
      <path
        fill="url(#a)"
        d="M590.623 557.459h16.441v196.012h-16.441z"
        transform="matrix(2.7797 0 0 2.77971 -395.177 -804.462)"
      />
      <path
        fill="url(#b)"
        d="M540.528 589.828h8.734v82.207h-8.734z"
        transform="matrix(2.7797 0 0 2.77971 -395.177 -762.807)"
      />
      <path
        fill="url(#c)"
        d="M179.075 639.153h16.955v131.195h-16.955z"
        transform="matrix(2.7797 0 0 2.77971 -395.177 -1016.088)"
      />
      <path
        fill="url(#d)"
        d="M234.083 631.974c-6.493-9.325-11.802-23.736-16.925-38.302v120.707h17.439z"
        transform="matrix(2.7797 0 0 2.54347 -384.019 -570.767)"
      />
      <path
        fill="url(#e)"
        d="M352.363 459.859c16.146-12.214 35.8-19.964 57.587-19.964 53.169 0 96.336 43.167 96.336 96.336 0 21.061-6.773 40.552-18.26 56.416-15.3 21.129-33.859 30.145-47.537 36.289l-1.051 15.42s113.887 46.204 123.631 127.246h-64.6l-13.171-16.996-1.882 16.996H276.444l-.144-51.869-32.238-48.978c-5.792-10.46-22.75-37.786-29.31-54.45-8.427-21.404-12.955-37.262-11.679-62.345 1.504-29.576 4.709-38.874 44.603-61.09 15.726-8.758 34.727-13.589 46.795-17.14 15.434-4.541 31.173-8.167 41.164-7.656 1.065.055-5.253 6.563-5.253 6.563-8.726 9.497-17.977 26.859-21.387 41.162-3.309.891-11.605 4.429-16.542 6.331-28.316 10.905-36.534 17.531-15.429 54.996 27.5 48.819 46.152 37.219 72.6 46.412l.96-11.454a97 97 0 0 1-10.854-9.926c-21.66-18.449-29.339-46.33-25.815-73.596 1.282-16.229 7.282-30.948 15.619-43.923 7.804-12.147 11.756-16.403 22.829-24.78m36.099 51.896 5.733 10.756 4.762-2.538-5.733-10.756 10.757-5.733-2.539-4.762-10.756 5.732-5.733-10.756-4.762 2.538 5.733 10.757-10.756 5.732 2.538 4.763zm52.411 16.316 6.124 10.539 4.666-2.712-6.125-10.538 10.539-6.125-2.712-4.665-10.538 6.124-6.124-10.538-4.666 2.711 6.124 10.539-10.538 6.124 2.712 4.666z"
        transform="matrix(2.7797 0 0 2.77971 -348.105 -749.929)"
      />
      <defs>
        <linearGradient
          id="a"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
          gradientTransform="translate(176.377 587.319)scale(430.0455)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={stop0Color} />
          <stop offset="1" stopColor={stop1Color} />
        </linearGradient>
        <linearGradient
          id="b"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
          gradientTransform="translate(176.377 572.333)scale(430.0455)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={stop0Color} />
          <stop offset="1" stopColor={stop1Color} />
        </linearGradient>
        <linearGradient
          id="c"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
          gradientTransform="translate(176.377 663.45)scale(430.0455)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={stop0Color} />
          <stop offset="1" stopColor={stop1Color} />
        </linearGradient>
        <linearGradient
          id="d"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
          gradientTransform="matrix(430.0455 0 0 469.9877 172.363 549.988)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={stop0Color} />
          <stop offset="1" stopColor={stop1Color} />
        </linearGradient>
        <linearGradient
          id="e"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
          gradientTransform="translate(159.443 567.7)scale(430.0455)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={stop0Color} />
          <stop offset="1" stopColor={stop1Color} />
        </linearGradient>
      </defs>
    </svg>
  );
});
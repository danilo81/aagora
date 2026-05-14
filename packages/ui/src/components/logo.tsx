import React from "react";
import { IconSvgProps } from "../types/types";
import { cn } from '../lib/utils';

export const Logo = ({ size = 48, className, ...props }: IconSvgProps) => (
    <svg
        id="Grupo"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={size}
        height={size}
        viewBox="0 0 784.000000 1025.000000"
        className={cn("text-primary", className)}
        {...props}
    >
        <g transform="translate(0.000000,1025.000000) scale(0.100000,-0.100000)"
            fill="currentColor" stroke="none">
            <path d="M3599 7735 c-161 -30 -309 -98 -436 -200 -166 -133 -277 -297 -339
-501 -25 -82 -28 -103 -28 -264 -1 -188 10 -250 69 -390 13 -32 226 -406 471
-832 246 -425 461 -802 478 -838 27 -57 31 -78 34 -170 3 -88 0 -116 -18 -169
-69 -204 -244 -331 -461 -331 -184 0 -307 75 -434 265 -309 464 -859 597
-1342 324 -97 -55 -253 -205 -319 -308 -214 -334 -212 -759 7 -1082 261 -388
756 -540 1189 -366 190 77 367 229 478 412 110 181 239 300 416 385 158 75
249 95 436 94 125 -1 170 -5 234 -23 258 -70 438 -203 606 -451 167 -248 338
-379 595 -456 81 -25 106 -28 250 -28 135 -1 172 3 240 21 119 33 218 77 309
137 415 277 562 817 341 1256 -50 101 -1742 3026 -1795 3105 -124 183 -346
337 -570 396 -109 28 -302 35 -411 14z"/>
        </g>
    </svg>
);

export default Logo;
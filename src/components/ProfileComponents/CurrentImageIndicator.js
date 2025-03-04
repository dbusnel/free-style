"use client"

import "../../style/profile-styles.css";

/**
 * Display a provided number of dots with an indicated current image index.
 * PROPS:
 *  - numDots: number of dots to display
 *  - currentImageIndex: index of the current image
 */
export default function CurrentImageIndicator(props) {
    let dots = Array(props.numDots).fill(0);
    dots[props.currentImageIndex] = 1;
    return <div style={{display:"flex"}}>{dots.map((val, index) => 
        (<p key={index} className={"selection-dot noselect "  + (val ? "bluedot" : "")}>•</p>))}</div>;
}
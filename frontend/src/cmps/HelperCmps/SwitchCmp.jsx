import { styled } from "@mui/material/styles";
import Switch, { switchClasses } from "@mui/material/Switch";
import { useState } from "react";

function pxToRem(num) {
    const px = num
    const oneRemPx = 17
    return `${px / oneRemPx}rem`
}

const SwitchStyles = styled(Switch)(() => {

    const width = '50px'
    const height = '32px'
    const size = '27px'
    const gap = 2.5          //(height - size) / 2
    const darkGray = "#222222"
    const lightGray = "#b0b0b0"

    return {
        width,
        height,
        padding: 0,
        overflow: "unset",

        [`& .${switchClasses.track}`]: {
            borderRadius: 40,
            backgroundColor: lightGray,
            opacity: 1,
            "&:hover": {
                backgroundColor: darkGray,
            },
        },

        [`& .${switchClasses.thumb}`]: {
            width: size,
            height: size,
            boxShadow: "none",
        },

        [`& .${switchClasses.switchBase}`]: {
            padding: pxToRem(gap),

            "&:hover": {
                [`& + .${switchClasses.track}`]: {
                    backgroundColor: darkGray,
                },
            },

            [`&.${switchClasses.checked}`]: {
                color: "#717171",
                transform: `translateX(calc(${width} - ${size} - ${pxToRem(2 * gap)}))`,

                [`& + .${switchClasses.track}`]: {
                    backgroundColor: darkGray,
                    opacity: 1,
                },

                [`& .${switchClasses.thumb}`]: {
                    backgroundColor: "#fff",
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path fill="${encodeURIComponent(darkGray)}" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                },
            },
        },
    }
})

export function SwitchCmp() {
    const [isChecked, setIsChecked] = useState(false)

    return <SwitchStyles
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
    />
}
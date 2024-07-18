
import { SvgPathCmp } from "./SvgPathCmp"

export function SvgWithNamesCmp({ svgNames, handleChange, selectedValue = '' }) {

    return <>
        {svgNames.map(name =>
            <div key={name} onClick={() => handleChange(name)}
                className={`svg ${name.replace(/_/g, ' ')} ${(selectedValue === name) ? 'selected' : ''}`}>
                <SvgPathCmp name={name} />
                <p>{name.replace(/_/g, ' ')}</p>
            </div>)}
    </>
}

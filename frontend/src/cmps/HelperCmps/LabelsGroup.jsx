
import { SvgPathCmp } from "./SvgPathCmp"

export function LabelsGroup({ svgNames, handleChange, selectedValue = '' }) {

    return <>
        {svgNames.map(name =>
            <div key={name} onClick={() => handleChange(name)}
                className={`svg ${name.replaceAll(' ', '').toLowerCase()} ${(selectedValue === name) ? 'selected' : ''}`}>
                <SvgPathCmp name={name.replaceAll(' ', '').toLowerCase()} />
                <p>{name}</p>
            </div>
        )}
    </>
}

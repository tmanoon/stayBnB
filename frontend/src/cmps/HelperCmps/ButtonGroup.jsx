import { SvgPathCmp } from './SvgPathCmp'

export function ButtonGroup({ type, items, selectedValue, handleChange }) {

    return <div className="btns grid">
        {items.map((item) => (
            <button
                key={item.replaceAll(' ', '').toLowerCase()}
                onClick={() => handleChange(type, item)}
                className={(type !== 'propType' && type !== 'editAmenities' && type !== 'editLabels') ? `btn ${selectedValue === item ? 'selected' : ''}` : `btn ${selectedValue.includes(item) ? 'selected' : ''}`}
            >
                {(type === 'propType' || type === 'editAmenities' || type === 'editLabels' || type === 'propertyType') && <SvgPathCmp name={item.replaceAll(' ', '').toLowerCase()} />}
                {item}
            </button>
        ))}
    </div>
}

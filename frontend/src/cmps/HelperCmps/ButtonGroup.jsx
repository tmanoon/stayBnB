import { SvgPathCmp } from './SvgPathCmp'

export function ButtonGroup({ type, items, selectedValue, handleChange }) {

    return <div className="btns grid">
        {items.map((item) => (
            <button
                key={item.value}
                onClick={() => handleChange(type, item.value)}
                className={type !== 'propType' ? `btn ${selectedValue === item.value ? 'selected' : ''}` : `btn ${selectedValue.includes(item.value) ? 'selected' : ''}`}
            >
                {type === 'propType' && <SvgPathCmp name={item.value} />}
                {item.label || item.value}
            </button>
        ))}
    </div>
}

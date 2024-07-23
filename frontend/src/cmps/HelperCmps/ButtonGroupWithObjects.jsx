import { SvgPathCmp } from './SvgPathCmp'

export function ButtonGroupWithObjects({ type, items, selectedValue, handleChange }) {

    return <div className="btns grid">
        {items.map((item) => (
            <button
                key={item.value}
                onClick={() => handleChange(type, item.value)}
                className={type !== 'propType' ? `btn ${selectedValue === item.value ? 'selected' : ''}` : `btn ${selectedValue.includes(item.value) ? 'selected' : ''}`}
            >
                {item.label || item.value}
            </button>
        ))}
    </div>
}
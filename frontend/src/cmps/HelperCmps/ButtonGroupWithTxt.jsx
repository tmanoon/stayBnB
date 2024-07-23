import { SvgPathCmp } from './SvgPathCmp'

export function ButtonGroupWithTxt({ type, items, selectedValue, handleChange }) {

    return <div className="btns grid">
        {items.map((item) => (
            <button
            key={item.value}
            onClick={() => handleChange(type, item.value)}
            className={`btn ${selectedValue.includes(item.value) ? 'selected' : ''}`}
            >
                <h2>{item.label || item.value}</h2>
                <p>{item.desc}</p>
                <SvgPathCmp name={item.value} />
            </button>
        ))}
    </div>
}
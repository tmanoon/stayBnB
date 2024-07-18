import { FormControlLabel, Checkbox } from '@mui/material'

export function CheckboxGroup({ type, items, selectedValues = [], handleChange }) {
    return (
        <div className="checkbox-group grid">
            {items.map((item) => (
                <div key={item.value} className="checkbox-item">
                    <FormControlLabel control={
                        <Checkbox
                            className='checkbox'
                            value={item.value}
                            checked={selectedValues.includes(item.value)}
                            onChange={() => handleChange(type, item.value)}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                            style={{ padding: 0, paddingInlineStart: 7, paddingInlineEnd: 13 }}
                        />}
                        label={item.label || item.value} />
                </div>
            ))}
        </div>
    )
}

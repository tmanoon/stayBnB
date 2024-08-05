import { FormControlLabel, Checkbox } from '@mui/material'

export function CheckboxGroup({ type, items, selectedValues = [], handleChange }) {
    return (
        <div className="checkbox-group grid">
            {items.map((item) => (
                <div key={item.replaceAll(' ', '').toLowerCase()} className="checkbox-item">
                    <FormControlLabel control={
                        <Checkbox
                            className='checkbox'
                            value={item.toLowerCase()}
                            checked={selectedValues.includes(item.toLowerCase())}
                            onChange={() => handleChange(type, item.toLowerCase())}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                            style={{ padding: 0, paddingInlineStart: 7, paddingInlineEnd: 13 }}
                        />}
                        label={item} />
                </div>
            ))}
        </div>
    )
}

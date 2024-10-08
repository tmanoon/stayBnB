import React, { useState } from "react"
import { DateRangePicker } from "react-date-range"
import "react-date-range/dist/styles.css" 
import "react-date-range/dist/theme/default.css"


export function HeaderDateFilter({ handleModalTypeChange, filterByToEdit, setFilterByToEdit }) {

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ])

    const handleSelect = ranges => {
        const startDateTimestamp = ranges.selection.startDate.getTime()
        const endDateTimestamp = ranges.selection.endDate.getTime()

        if (!filterByToEdit.entryDate && !filterByToEdit.exitDate) {
            setFilterByToEdit({ ...filterByToEdit, entryDate: startDateTimestamp })
        } else if (filterByToEdit.entryDate && !filterByToEdit.exitDate) {
            setFilterByToEdit({ ...filterByToEdit, exitDate: endDateTimestamp })
        } else {
            setFilterByToEdit({ ...filterByToEdit, entryDate: startDateTimestamp, exitDate: null })
        }
        setDateRange([ranges.selection])
        handleModalTypeChange('', 'check-out')
    }

    return (
        <section className='date-filter modal'>
            <DateRangePicker
                ranges={dateRange}
                onChange={handleSelect}
                months={2}
                showSelectionPreview={false}
                showPreview={false}
                showMonthAndYearPickers={false}
                showDateDisplay={false}
                direction="horizontal"
                staticRanges={[]}
                inputRanges={[]}
                enableOutsideDays={true}
                minDate={new Date()}
                rangeColors={['#c72d65']}
            // disabledDates={disabledDates}
            />
        </section>
    )
}

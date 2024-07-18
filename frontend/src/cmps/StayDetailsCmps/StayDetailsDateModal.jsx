import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

export function StayDetailsDateModal({ updateParams, params, stay }) {
    const [dateRange, setDateRange] = useState([
        {
            startDate: +params.entryDate,
            endDate: +params.exitDate,
            key: "selection"
        }
    ]);

    const handleSelect = (ranges) => {
        const startDateTimestamp = ranges.selection.startDate.getTime();
        const endDateTimestamp = ranges.selection.endDate.getTime();

        if (!params.entryDate && !params.exitDate) {
            updateParams({ ...params, entryDate: startDateTimestamp });
        } else if (params.entryDate && !params.exitDate) {
            updateParams({ ...params, exitDate: endDateTimestamp });
        } else {
            updateParams({ ...params, entryDate: startDateTimestamp, exitDate: null });
        }

        setDateRange([ranges.selection]);
    };

    const disabledDatesArray = stay.bookedDates.reduce((acc, booking) => {
        const entryDate = new Date(booking.entryDate);
        const exitDate = new Date(booking.exitDate);

        const datesBetween = getDatesBetween(entryDate, exitDate);

        return acc.concat(datesBetween);
    }, []);

    return (
        <section className='stay-details-date-filter '>
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
                disabledDates={disabledDatesArray.map(date => date.getTime())}
                minDate={new Date()}
                rangeColors={['#c72d65']
                }
            />
        </section>
    );
}

function getDatesBetween(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

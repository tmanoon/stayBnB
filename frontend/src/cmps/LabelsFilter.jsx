import { useState } from "react"

import { SvgWithNamesCmp } from "./HelperCmps/SvgWithNamesCmp"
import { FilterModal } from './FilterModal'

import { filterLists } from "../services/filterLists.service"
import { SvgPathCmp } from "./HelperCmps/SvgPathCmp"

export function LabelsFilter({ setStayFilter, filterBy, scrolledPage }) {
	const [showFilterModal, setShowFilter] = useState(false)
	const [selectedValue, setSelectedValue] = useState('')

	function handleChange(label) {
		setSelectedValue(label)
		setStayFilter({ ...filterBy, label: [label] })
	}

	const openFilterModal = () => {
		setShowFilter(true)
	}

	const scrolledHeader = () => {
		if (scrolledPage) {
			return 'labels-header-condensed'
		} else {
			return 'labels-header-expanded'
		}
	}

	return <>
		<section className={`index-filter-section grid ${scrolledHeader()}`}>
			<section className="label-filter-section grid ">
				<SvgWithNamesCmp
					svgNames={filterLists.filterLabels}
					handleChange={handleChange}
					selectedValue={selectedValue} />
			</section>

			<button className="flex align-center" onClick={openFilterModal}>
				<SvgPathCmp name={'settings'} />
				<span>Filters</span>
			</button>
		</section>

		{showFilterModal && <FilterModal
			setShowFilter={setShowFilter}
			setStayFilter={setStayFilter}
			filterBy={filterBy}
		/>}
	</>
}
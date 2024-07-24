import { useState } from "react"
import { LabelsGroup } from "../HelperCmps/LabelsGroup"
import { FilterModal } from '../HeaderCmps/FilterModal'
import { filterLists } from "../../services/filterLists.service"
import { SvgPathCmp } from "../HelperCmps/SvgPathCmp"

export function LabelsFilter({ filterBy, setStayFilter }) {
	const [showFilterModal, setShowFilter] = useState(false)
	const [selectedValue, setSelectedValue] = useState('')

	function handleChange(label) {
		setSelectedValue(label)
		setStayFilter({ ...filterBy, label: [label] })
	}

	const openFilterModal = () => {
		setShowFilter(true)
	}

	return (
		<>
			<section className={'filter-labels-section grid'}>
				<div className="labels-filter grid ">
					<LabelsGroup
						svgNames={filterLists.filterLabels}
						handleChange={handleChange}
						selectedValue={selectedValue} />
				</div>

				<button className="flex center" onClick={openFilterModal}>
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
	)
}
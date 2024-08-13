import { useDispatch, useSelector } from "react-redux"
import { selectFilter } from "../../store/selectors/filters-selectors"
import './filter.css'
import { filtersSlice } from "../../store/reducers/filter-slice"

interface IFilter {
    filterItem: string
}

export const Filter = ({filterItem}: IFilter) => {
    const filter = useSelector(selectFilter)

    const dispatch = useDispatch()
    const {setFilter} = filtersSlice.actions

    const setActiveFilter = () => dispatch(setFilter(filterItem))
    return (
        <div onClick={setActiveFilter} className={filter === filterItem ? 'filter active-filter' : 'filter'}>{filterItem}</div>
    )   
}

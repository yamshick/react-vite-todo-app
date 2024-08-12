import { useDispatch, useSelector } from "react-redux"
import { selectFilter } from "../../store/selectors/filters-selectors"
import './filter.css'
import { filtersSlice } from "../../store/reducers/filter-slice"

export const Filter = ({filterItem}) => {
    const filter = useSelector(selectFilter)

    const dispatch = useDispatch()
    const {setFilter} = filtersSlice.actions

    const setActiveFilter = () => dispatch(setFilter(filterItem))
    return (
        // <div className={filter === filterItem ? 'active-filter' : ''}>{filterItem}</div>
        <div onClick={setActiveFilter} className={filter === filterItem ? 'filter active-filter' : 'filter'}>{filterItem}</div>
    )   
}

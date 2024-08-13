import { FILTERS } from "../constants"
import './filters.css'
import {Filter} from './filter'

export const Filters = () => {

    return (
        <nav className="filters">
            {Object.keys(FILTERS).map(filterItem => (<Filter key={filterItem} filterItem={filterItem}/>))}
        </nav>
    )
}
import React from 'react';
import './filter-price.css';

const FilterPrice = ({selectedIncDecSort}) =>{
    return(
        <div className="filter-goods">
            
            <select name="price" onChange = { (e) => selectedIncDecSort(e.target.value)}>
                <option   value="without_sort">Нет</option>
                <option value="increase">По возрастанию цены</option>
                <option value="decrease">По убыванию цены</option>
            </select>

        </div>
    )
}

export default FilterPrice;
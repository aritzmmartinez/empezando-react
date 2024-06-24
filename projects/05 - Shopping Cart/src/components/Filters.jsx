import { useState } from "react"
import './Filters.css'

export function Filters () {
    const [minPrice, setMinPrice] = useState(0)

    const handleChangeMinPrice = (event) => {
        setMinPrice(event.target.value)
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor="price">Price</label>
            </div>
            <input type="range" id="price" name="price" min="0" max="1000" onChange={handleChangeMinPrice}/>
            <span>${minPrice}</span>

            <div>
                <label htmlFor="category">Category</label>
                <select id="category" name="category">
                    <option value="all">All</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="beauty">Beauty</option>
                    <option value="furniture">Furniture</option>
                    <option value="groceries">Groceries</option>
                </select>
            </div>
        </section>
    )
}
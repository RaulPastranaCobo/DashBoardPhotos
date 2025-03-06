import { useState } from "react";

function Filter({ onFilter }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onFilter(value);
    };

    return (
        <div className='filter'>
            <input
                type="text"
                placeholder="Search by description"
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    );
}

export default Filter;

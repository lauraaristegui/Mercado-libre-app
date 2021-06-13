import React, { useState } from 'react'




const Searchbar = (props) => {


    const [searchProduct, setSearchProduct] = useState("")


    const handleChange = (e) => {
        setSearchProduct(e.target.value)
    }

    return (
        < >
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark" >
                <form className="form-inline">
                    <input className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchProduct}
                        onChange={handleChange}
                    />

                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => {
                        e.preventDefault()
                        props.handleSubmit(searchProduct)
                    }}>
                        Search
                        </button>
                </form>
            </nav>
        </>




    )
}


export default Searchbar 

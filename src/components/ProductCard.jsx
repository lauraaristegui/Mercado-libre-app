import React from 'react'


const ProductCard = ({
    imagen,
    title,
    price,
    stock,
    condition,


}) => {

    return (
        <>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="w-100 mt-3 ml-3" src={imagen} alt="imagen" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">Precio: ARS${price}</p>
                            <p className="card-text">Stock: {stock}</p>
                            <p className="card-text"><small className="text-muted">Condition: {condition}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>



    )
}



export default ProductCard

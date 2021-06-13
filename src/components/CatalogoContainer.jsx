import React, { useState } from 'react'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap'


import ProductCard from './ProductCard'
import Searchbar from './Searchbar'
import axios from 'axios'
import Pagination from './Pagination'
import _ from 'lodash'

const items = [
    {
        src: 'https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-3c81dfaa-257e-42bc-9f90-b2bf458b9057.jpg',

    },
    {
        src: 'https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-d60f7652-27c2-4b82-be52-35fc3345bf99.jpg',
    },

    {
        src: 'https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-90dae915-1b49-40c5-b6e9-ed3d2f35bf4c.jpg',

    }
];

const CatalogoContainer = () => {
    const [products, setProducts] = useState([])// trae todos los prodcutos 
    const [sort, setSort] = useState() // oredena por precio
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")



    const handleSubmit = (searchProduct) => {
        axios(`http://localhost:3001/api/search?query=${searchProduct}`)
            .then(res => {
                console.log('busqueda', res.data)
                setProducts(res.data)
                setSearch(searchProduct)
            })
    }

    const productsCondition = (condicion) => {
        axios('http://localhost:3001/api/search?query=' + search + " " + (condicion === 'new' ? "nuevo" : "usado"))
            .then(res => {
                let aux = res.data
                aux = aux.filter(p => p.condition === condicion)
                setProducts(aux)
            })
    }

    const filtered = (e) => {
        productsCondition(e.target.value)
        console.log(e.target.value)

    }

    // ordenar por precio
    const sortProductos = (sort) => {
        let aux = products
        if (sort === 'lowerPrice') {
            aux.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        }
        if (sort === 'higher price') {
            aux.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        }
        console.log(aux)
        return setProducts(aux)
    }

    const sortProducts = event => {
        setSort(event.target.value)
        sortProductos(event.target.value)
        console.log(event.target.value)

    }

    //paginacion
    const paginate = (items, pageNumber, pageSize) => {
        const startIndex = (pageNumber - 1) * pageSize
        return _(items).slice(startIndex).take(pageSize).value()
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const productsPag = paginate(products, currentPage, 30)

    // carrusel
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }
    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}

            >
                <img src={item.src} alt={item.altText} className="d-block w-100" />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });


    return (
        <>
            <Searchbar handleSubmit={handleSubmit} />

            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />

            </Carousel>

            <div>

                <div className="align-items-center">
                    <p className="m-0 px-2">Price:</p>
                    <select
                        className="form-control form-control-sm"
                        onChange={sortProducts}
                    >
                        <option>Precio</option>
                        <option value="menorPrecio">Lower Price</option>
                        <option value="mayorPrecio">Higher Price</option>
                    </select>


                    <div className="align-items-center">
                        <p className="m-0 px-2">Condición:</p>
                        <select
                            className="form-control form-control-sm mb-2"
                            onChange={filtered}
                        >
                            <option>condicion</option>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                        </select>
                    </div>
                </div>
                {
                    productsPag.map(product => (
                        <ProductCard
                            title={product.title}
                            price={product.price}
                            stock={product.available_quantity}
                            condition={product.condition}
                            imagen={product.thumbnail}
                            key={product.id}
                        />
                    ))
                }
            </div>

            <Pagination
                itemsCount={products.length}
                pageSize={30}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    )
}


export default CatalogoContainer
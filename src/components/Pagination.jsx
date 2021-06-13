import React from 'react';
import _ from 'lodash'



const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize)
    if (pagesCount === 1) return null
    const pages = _.range(1, pagesCount + 1)


    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages.map(page => {
                        return <li
                            className={page === currentPage ? `page-item active` : 'page-item'}
                            key={page}>
                            <a className="page-link" onClick={() => onPageChange(page)} >{page}</a>
                        </li>

                    })}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;
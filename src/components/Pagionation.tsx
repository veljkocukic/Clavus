import ReactPaginate from 'react-paginate'


type TPagination = {
    pageCount: number
    setPage: (string) => any
    forcePage: number
}
export const Pagination = ({ setPage, pageCount, forcePage }: TPagination) => {
    return pageCount > 1 ? <ReactPaginate
        onPageChange={({ selected }) => setPage(selected + 1)}
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={pageCount || 4}
        containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='arrow-page'
        previousLinkClassName='page-link'
        nextClassName='arrow-page'
        nextLinkClassName='page-link'
        activeClassName='page-item-active'
        activeLinkClassName='page-link-active'
        breakLabel={false}
        forcePage={forcePage}
        disabledClassName='disabled'
        disabledLinkClassName='disabled'
    ></ReactPaginate> : null
}

export const pageCount = (total,pageSize) => {
    let totalPages = Math.ceil(total/pageSize)
    const pageOptions = Array.from({ length: totalPages }, (_, index) => index + 1);
    return pageOptions;
}
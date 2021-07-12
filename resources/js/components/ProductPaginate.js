import { Pagination, PaginationItem } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";

const ProductPaginate = ({ type, pCat, cCat, page, count }) => {
    return (
        <Pagination
            page={page}
            count={count}
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`/products/type/${type}/parent-category/${pCat}/child-category/${cCat}${item.page === 1 ? "" : `/${item.page}`}`}
                    {...item}
                />
            )}
        />
    );
};

export default ProductPaginate;
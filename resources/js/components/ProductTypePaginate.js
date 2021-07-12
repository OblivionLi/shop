import { Pagination, PaginationItem } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";

const ProductTypePaginate = ({ type, page, count }) => {
    return (
        <Pagination
            page={page}
            count={count}
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`/products/type/${type}${item.page === 1 ? "" : `/${item.page}`}`}
                    {...item}
                />
            )}
        />
    );
};

export default ProductTypePaginate;
import { Pagination, PaginationItem } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";

const ReviewPaginate = ({ product, page, count }) => {
    return (
        <Pagination
            page={page}
            count={count}
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`/reviews/product/${product}${item.page === 1 ? "" : `/${item.page}`}`}
                    {...item}
                />
            )}
        />
    );
};

export default ReviewPaginate;

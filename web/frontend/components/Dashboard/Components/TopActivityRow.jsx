import moment from "moment-timezone";
import React from "react";

const TopActivityRow = (item) => {
  return [
    <>{moment(item.created_at).format("DD MMMM, YYYY")}</>,
    <span>
      <a
        href={`https://${item.shop}/admin/orders/${item.order_id}`}
        target="_blank"
      >
        {item.order_name}
      </a>
    </span>,
    <>{item.customer_name}</>,
    <>{item.action}</>,
    <span className="action_btn d-flex align-items-center">
      {item.value && (
        <>
          <>{item.value}</>(
          <a
            href={`https://${item.shop}/admin/orders/${item.order_id}`}
            target="_blank"
          >
            {item.order_name}
          </a>
          )
        </>
      )}
    </span>,
  ];
};

export default TopActivityRow;

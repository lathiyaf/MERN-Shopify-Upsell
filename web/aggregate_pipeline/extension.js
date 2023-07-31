export const pipelineForFunnel = () => {
  let pipeline = [
    {
      $lookup: {
        from: "funnel_offers",
        let: { funnel_id: "$funnel_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $in: ["$funnel_id", ["$$funnel_id"]],
                  },
                  { $eq: ["$location_no", "1"] },
                ],
              },
            },
          },
        ],
        as: "funnelData",
      },
    },
    { $unwind: "$funnelData" },
    {
      $project: {
        conditions: 1,
        funnel_title: 1,
        shop: 1,
        funnel_id: 1,
        funnelData: 1,
      },
    },
  ];
  return pipeline;
};

export const pipelineForProducts = (filter) => {
  let pipeline = [
    { $match: filter },
    { $unwind: "$variants" },
    {
      $addFields: {
        convertedPrice: {
          $toDecimal: "$variants.price",
        },
      },
    },
    { $sort: { convertedPrice: -1 } },
    {
      $project: {
        variants: 1,
        options: 1,
        id: 1,
        title: 1,
        images: { $arrayElemAt: ["$images.src", 0] },
        vendor: 1,
      },
    },
  ];
  return pipeline;
};

export const pipelineForOrderStats = (filter) => {
  let pipeline = [
    {
      $match: filter,
    },
    {
      $addFields: {
        totalPrice: {
          $toDecimal: "$total_price",
        },
      },
    },
    {
      $group: {
        _id: false,
        totalAmount: {
          $sum: "$totalPrice",
        },
      },
    },
  ];
  return pipeline;
};

export const pipelineForFunnelOrderStats = (filter) => {
  let pipeline = [
    {
      $match: filter,
    },
    {
      $group: {
        _id: false,
        totalAmount: { $sum: "$discount_price" },
      },
    },
  ];
  return pipeline;
};

export const pipelineForDashboardFunnel = (filter, extraParams, count) => {
  let pipeline = [
    { $match: filter },
    {
      $lookup: {
        from: "offer_accepts",
        let: { funnel_id: "$funnel_id", is_accept: true },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$funnel_id", "$$funnel_id"] },
                  { $eq: ["$is_accept", "$$is_accept"] },
                ],
              },
            },
          },
        ],
        as: "offerAcceptData",
      },
    },
    {
      $lookup: {
        from: "impressions",
        let: { funnel_id: "$funnel_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$funnel_id", "$$funnel_id"] }],
              },
            },
          },
        ],
        as: "impressionsData",
      },
    },
    {
      $project: {
        conditions: 1,
        funnel_title: 1,
        is_default: 1,
        status: 1,
        shop: 1,
        funnel_id: 1,
        offer_data: 1,
        main_trigger: 1,
        created_at: 1,
        accepted_offers: { $size: "$offerAcceptData" },
        total_impression: { $size: "$impressionsData" },
      },
    },
    { $sort: { created_at: -1 } },
  ];
  if (count) {
    pipeline.push({ $count: "total" });
  }
  if (extraParams) {
    if (extraParams.skip) pipeline.push({ $skip: Number(extraParams.skip) });
    if (extraParams.limit) pipeline.push({ $limit: Number(extraParams.limit) });
  }

  return pipeline;
};

export const pipelineForDashboardTY = (filter, extraParams, count) => {
  let pipeline = [
    { $match: filter },
    {
      $lookup: {
        from: "offer_accepts",
        let: { thankyou_page_id: "$template_id", is_accept: true },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$thankyou_page_id", "$$thankyou_page_id"] },
                  { $eq: ["$is_accept", "$$is_accept"] },
                ],
              },
            },
          },
        ],
        as: "offerAcceptData",
      },
    },
    {
      $lookup: {
        from: "impressions",
        let: { thankyou_page_id: "$template_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$thankyou_page_id", "$$thankyou_page_id"] }],
              },
            },
          },
        ],
        as: "impressionsData",
      },
    },
    {
      $project: {
        name: 1,
        status: 1,
        shop: 1,
        funnel_id: 1,
        template_id: 1,
        created_at: 1,
        updated_at: 1,
        is_default: 1,
        left_section_data: 1,
        accepted_offers: { $size: "$offerAcceptData" },
        total_impression: { $size: "$impressionsData" },
      },
    },
    { $sort: { created_at: -1 } },
  ];
  if (count) {
    pipeline.push({ $count: "total" });
  }
  if (extraParams) {
    if (extraParams.skip) pipeline.push({ $skip: Number(extraParams.skip) });
    if (extraParams.limit) pipeline.push({ $limit: Number(extraParams.limit) });
  }

  return pipeline;
};

export const pipelineForActivity = (filter, extraParams, count) => {
  const pipeline = [
    { $match: filter },
    {
      $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "cid",
        as: "customerData",
      },
    },
    {
      $project: {
        action: 1,
        customer_id: 1,
        funnel_id: 1,
        offer_id: 1,
        shop: 1,
        value: 1,
        activity_id: 1,
        created_at: 1,
        order_id: 1,
        order_name: 1,
        template_id: 1,
        customer_name: {
          $concat: [
            { $arrayElemAt: ["$customerData.first_name", 0] },
            " ",
            { $arrayElemAt: ["$customerData.last_name", 0] },
          ],
        },
      },
    },
    { $sort: { created_at: -1 } },
  ];

  if (count) {
    pipeline.push({ $count: "total" });
  }
  if (extraParams) {
    if (extraParams.skip) pipeline.push({ $skip: Number(extraParams.skip) });
    if (extraParams.limit) pipeline.push({ $limit: Number(extraParams.limit) });
  }
  return pipeline;
};

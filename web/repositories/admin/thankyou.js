import moment from "moment-timezone";
import { pipelineForDashboardTY } from "../../aggregate_pipeline/extension.js";
import { logger, level } from "../../config/logger.js";
import sectionModel from "../../models/section.js";
import tyPageModel from "../../models/thank_you_page.js";
import shopify from "../../shopify.js";

export const createThankYouPage = async (body, session) => {
  logger.log(level.info, `>> createThankYouPage()`);
  if (body.is_duplicate) {
    body.name = "Copy_" + body.name;
  }
  let addedData = await tyPageModel.add({ ...body, shop: session.shop });
  if (body.section_data) {
    body.section_data.map(async (section) => {
      await sectionModel.add({
        ...section,
        template_id: addedData.template_id,
      });
    });
  }
  const data = {
    message: "Thank you page created successfully",
    template_id: addedData.template_id,
  };
  return data;
};

export const getThankYouPageById = async (query) => {
  logger.log(level.info, `>> getThankYouPageById()`);
  const [templateData] = await tyPageModel.get({
    template_id: query.template_id,
  });
  const data = {
    message: "Thank you page fetched successfully",
    data: templateData,
  };
  return data;
};

export const editThankYouPage = async (query, body, session) => {
  logger.log(level.info, `>> editThankYouPage()`);
  let updatedData = { ...body };

  if (body.is_default) {
    await tyPageModel.updateMany(
      { shop: session.shop },
      { $set: { is_default: false } }
    );
    updatedData.status = 1;
  }

  await tyPageModel.update(
    {
      template_id: query.template_id,
    },
    {
      $set: updatedData,
    }
  );
  const data = {
    message: "Thank you page updated successfully",
  };
  return data;
};

export const deleteThankYouPage = async (query) => {
  logger.log(level.info, `>> deleteThankYouPage()`);
  await tyPageModel.delete({
    template_id: query.template_id,
  });
  const data = {
    message: "Thank you page deleted successfully",
  };
  return data;
};

export const addSection = async (body) => {
  logger.log(level.info, `>> addSection()`);

  if (body.area === "general") {
    const sectionData = await sectionModel.get({
      template_id: body.template_id,
      section_id: body.section_id,
    });

    if (sectionData.length === 0) {
      let addedData = await sectionModel.add({
        ...body,
      });
      const data = {
        message: "Section added successfully",
        section_data: addedData,
      };
      return data;
    } else {
      let updatedData = await sectionModel.update(
        { template_id: body.template_id, section_id: body.section_id },
        {
          $set: {
            ...body,
          },
        }
      );
      const data = {
        message: "Section updated successfully",
        section_data: updatedData,
      };
      return data;
    }
  } else {
    let addedData = await sectionModel.add({
      ...body,
    });
    const data = {
      message: "Section added successfully",
      section_data: addedData,
    };
    return data;
  }
};

export const getAllSelectedSection = async (query) => {
  logger.log(level.info, `>> getAllSelectedSection()`);
  const { template_id } = query;
  let data = {};

  const sectionData = await sectionModel.get({
    template_id,
    status: 1,
  });

  if (sectionData && sectionData.length > 0) {
    data = {
      message: "Section data fetched successfully",
      data: sectionData,
    };
  } else {
    data = {
      message: "Section data fetched successfully",
      data: [],
    };
  }
  return data;
};

export const editSection = async (query, body) => {
  logger.log(level.info, `>> editSection()`);

  if (query.type) {
    const [sectionData] = await sectionModel.get({
      section_id: query.section_id,
    });

    if (sectionData) {
      await sectionModel.update(
        {
          section_id: query.section_id,
        },
        {
          $set: { ...body },
        }
      );
    }
  } else {
    const [sectionData] = await sectionModel.get({
      row_section_id: query.section_id,
    });

    if (sectionData) {
      await sectionModel.update(
        {
          row_section_id: query.section_id,
        },
        {
          $set: { ...body },
        }
      );
    }
  }

  const data = {
    message: "Section updated successfully",
  };
  return data;
};

export const deleteSection = async (query) => {
  logger.log(level.info, `>> deleteSection()`);

  const [sectionData] = await sectionModel.get({
    row_section_id: query.section_id,
  });

  if (sectionData) {
    await sectionModel.delete({
      row_section_id: query.section_id,
    });
    await tyPageModel.update(
      { template_id: sectionData.template_id },
      {
        $pull: {
          left_section_data: {
            id: query.section_id,
          },
        },
      }
    );
  }

  const data = {
    message: "Section deleted successfully",
  };
  return data;
};

export const getSectionById = async (query) => {
  logger.log(level.info, `>> getSectionById()`);

  let filter = {};
  if (query.row_section_id) {
    filter.row_section_id = query.row_section_id;
  }
  if (query.section_id) {
    filter.section_id = query.section_id;
  }

  const [sectionData] = await sectionModel.get(filter);
  const data = {
    message: "section data fetched successfully",
    data: sectionData,
  };
  return data;
};

export const getScriptTags = async (session) => {
  logger.log(level.info, `>> getScriptTags()`);

  const data = await shopify.api.rest.ScriptTag.all({
    session: session,
  });
  return data;
};

export const addScriptTag = async (session) => {
  logger.log(level.info, `>> addScriptTag()`);
  const script_tag = new shopify.api.rest.ScriptTag({ session: session });
  script_tag.event = "onload";
  // script_tag.src = `${process.env.HOST}/static/main.js`;
  script_tag.src = `${process.env.SCRIPT_URL}/static/main.js`;
  script_tag.display_scope = "order_status";
  await script_tag.save({
    update: true,
  });
  const data = { message: "Script tag added successfully" };
  return data;
};

export const deleteScriptTag = async (session, query) => {
  logger.log(level.info, `>> deleteScriptTag`);
  const { script_id } = query;

  await shopify.api.rest.ScriptTag.delete({
    session: session,
    id: script_id,
  });
  const data = { message: "Script tag deleted successfully" };
  return data;
};

export const getAllThankYouPages = async (session, options, query) => {
  logger.log(level.info, `>> getAllThankYouPages()`);
  let filter = { shop: session.shop };
  const { day, start_date, end_date } = query;

  if (day === "today") {
    filter = {
      ...filter,
      created_at: { $gte: new Date() },
    };
  } else if (day === "yesterday") {
    filter = {
      ...filter,
      created_at: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        $lt: new Date(),
      },
    };
  } else if (day === "last7days") {
    filter = {
      ...filter,
      created_at: {
        $gte: moment().subtract(7, "days").toDate(),
      },
    };
  } else if (day === "last30days") {
    filter = {
      ...filter,
      created_at: {
        $gte: moment().subtract(30, "days").toDate(),
      },
    };
  } else if (day === "this") {
    filter = {
      ...filter,
      created_at: {
        $gt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(),
      },
    };
  } else if (day === "last") {
    filter = {
      ...filter,
      created_at: {
        $gt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        $lt: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()
        ),
      },
    };
  } else if (day === "custom") {
    filter = {
      ...filter,
      created_at: {
        $gt: moment(start_date).toDate(),
        $lt: moment(end_date).toDate(),
      },
    };
  }

  const tyPageData = await tyPageModel.aggregate(
    pipelineForDashboardTY(filter, options)
  );
  const count = await tyPageModel.aggregate(
    pipelineForDashboardTY(filter, {}, true)
  );
  const data = {
    message: "Thank you page data fetched successfully.",
    data: tyPageData,
    count: count[0]?.total ? count[0].total : 0,
  };
  return data;
};

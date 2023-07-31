import { logger, level } from "../config/logger.js";
import sectionModel from "../models/section.js";

(async () => {
  const sectionData = await sectionModel.get({});
  if (sectionData.length === 0) {
    let addedSection = [
      {
        section_id: 1,
        section_name: "Order confirmed",
        status: 1,
        area: "left",
        row_section_id: "1",
      },
      {
        section_id: 2,
        section_name: "Customer information",
        status: 1,
        area: "left",
        row_section_id: "2",
      },
      {
        section_id: 20,
        section_name: "Order summary",
        status: 1,
        area: "right",
        row_section_id: "20",
      },
    ];

    addedSection.map(async (section) => {
      await sectionModel.add(section);
    });

    logger.log(level.info, `>> section added successfully`);
  }
})();

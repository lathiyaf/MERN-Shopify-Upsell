import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RenderHeader = ({ section_data }) => {
  const data = useSelector((state) => state.section_data);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (section_data?.section_id?.toString() === data?.section_id) {
      setIsEdit(true);
    } else if (section_data?.row_section_id === data?.row_section_id) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data, section_data, isEdit]);

  return (
    <>
      {isEdit ? (
        <>
          <div
            style={{
              textAlign: data?.btn_alignment,
            }}
          >
            <div className="pl-15">
              {data?.img !== "" ? (
                <img
                  src={data?.img}
                  alt="logo"
                  className="img-fluid"
                  style={{
                    height: "4.28571em",
                  }}
                />
              ) : (
                <> {data?.placeholder_text}</>
              )}
            </div>
            <div className="mt-3 mb-3">
              <ul className="navigation pl-15">
                {data &&
                  data?.links &&
                  data?.links.length > 0 &&
                  data?.links.map((link, i) => {
                    return (
                      <li
                        style={{
                          fontSize: data?.head_fs_size + "px",
                          textTransform: data?.head_selected_text_transform,
                          fontWeight: data?.head_style.includes("B")
                            ? "bold"
                            : "",
                          fontStyle: data?.head_style.includes("I")
                            ? "italic"
                            : "",
                        }}
                        key={i}
                      >
                        <a
                          href={link?.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: data?.color,
                          }}
                        >
                          {link?.name}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              textAlign: section_data?.btn_alignment,
            }}
          >
            <div className="pl-15">
              {section_data?.img !== "" ? (
                <img
                  src={section_data?.img}
                  alt="logo"
                  className="img-fluid"
                  style={{
                    height: "4.28571em",
                  }}
                />
              ) : (
                <> {section_data?.placeholder_text}</>
              )}
            </div>
            <div className="mt-3 mb-3">
              <ul className="navigation pl-15">
                {section_data &&
                  section_data?.links &&
                  section_data?.links.length > 0 &&
                  section_data?.links.map((link, i) => {
                    return (
                      <li
                        style={{
                          fontSize: section_data?.head_fs_size + "px",
                          textTransform:
                            section_data?.head_selected_text_transform,
                          fontWeight: section_data?.head_style.includes("B")
                            ? "bold"
                            : "",
                          fontStyle: section_data?.head_style.includes("I")
                            ? "italic"
                            : "",
                        }}
                        key={i}
                      >
                        <a
                          href={link?.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: section_data?.color,
                          }}
                        >
                          {link?.name}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderHeader;

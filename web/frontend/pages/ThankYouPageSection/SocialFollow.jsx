import React, { useState, useEffect } from "react";
import { MobileChevronMajor, ViewMinor } from "@shopify/polaris-icons";
import { Icon, TextField, Banner, Button } from "@shopify/polaris";
import { useSelector, useDispatch } from "react-redux";
import { SECTION_DELETE, SECTION_DETAILS } from "../../Store/consts";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";

const SocialFollow = ({
  section_data,
  setSection,
  setLabel,
  section_id,
  GetSectionsAPI,
  characters,
  updateCharacters,
  areas,
}) => {
  const data = useSelector((state) => state.section_data);
  const dispatch = useDispatch();
  const app = useAppBridge();
  const [content, setContent] = useState([]);

  const addFields = () => {
    setContent([...content, { contains: "" }]);
  };

  const handleInputChange = (value, index) => {
    const list = [...content];
    list[index]["contains"] = value;
    setContent(list);
  };

  const removeFields = (i) => {
    let newValue = [...content];
    newValue.splice(i, 1);
    setContent(newValue);
  };

  useEffect(() => {
    if (Object.keys(section_data).length > 0) {
      dispatch({
        type: SECTION_DETAILS,
        payload: { ...section_data },
      });
      setContent(section_data?.content);
    }
  }, [section_data]);

  const deleteSectionAPI = async () => {
    if (section_data?.row_section_id) {
      const token = await getSessionToken(app);
      axios({
        url: `https://${window.location.host}/api/thankyou/section?section_id=${section_data?.row_section_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setSection("section2");
          GetSectionsAPI();
          dispatch({
            type: SECTION_DELETE,
            payload: {},
          });
        })
        .catch((err) => {});
    } else if (section_id !== undefined) {
      const token = await getSessionToken(app);
      axios({
        url: `https://${window.location.host}/api/thankyou/section?section_id=${section_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setSection("section2");
          GetSectionsAPI();
          dispatch({
            type: SECTION_DELETE,
            payload: {},
          });
        })
        .catch((err) => {});
    }
  };

  const updateSectionAPI = async () => {
    let body = {
      content: content,
    };
    if (
      data.row_section_id === section_id &&
      data?.section_name === section_data?.section_name
    ) {
      dispatch({
        type: `${SECTION_DETAILS}`,
        payload: { ...section_data, ...body },
      });
      let result = characters;
      var item = {
        id: data?.row_section_id,
        iconName: data?.iconName,
        is_fa_icon: data?.is_fa_icon,
        is_disabled: data?.is_disabled,
        area: data?.area,
        name: data?.section_name,
        section_data: {
          ...body,
          iconName: data?.iconName,
          is_disabled: data?.is_disabled,
          is_fa_icon: data?.is_fa_icon,
          row_section_id: data?.row_section_id,
          section_id: data?.section_id,
          section_name: data?.section_name,
          status: data?.status,
          template_id: data?.template_id,
        },
      };

      characters.forEach((element, index) => {
        if (
          element.id === data?.row_section_id &&
          element.name === data?.section_name
        ) {
          characters[index] = item;
        }
      });

      updateCharacters(result);
      const token = await getSessionToken(app);
      axios({
        url: `https://${window.location.host}/api/thankyou/section?section_id=${data.row_section_id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      })
        .then((res) => {})
        .catch((err) => {});
    } else if (
      data.row_section_id === section_data?.row_section_id &&
      data?.section_name === section_data?.section_name
    ) {
      dispatch({
        type: `${SECTION_DETAILS}`,
        payload: { ...section_data, ...body },
      });
      let result = characters;
      var item = {
        id: data?.row_section_id,
        iconName: data?.iconName,
        is_fa_icon: data?.is_fa_icon,
        is_disabled: data?.is_disabled,
        area: data?.area,
        name: data?.section_name,
        section_data: {
          ...body,
          iconName: data?.iconName,
          is_disabled: data?.is_disabled,
          is_fa_icon: data?.is_fa_icon,
          row_section_id: data?.row_section_id,
          section_id: data?.section_id,
          section_name: data?.section_name,
          status: data?.status,
          template_id: data?.template_id,
        },
      };

      characters.forEach((element, index) => {
        if (
          element.id === data?.row_section_id &&
          element.name === data?.section_name
        ) {
          characters[index] = item;
        }
      });

      updateCharacters(result);
      const token = await getSessionToken(app);
      axios({
        url: `https://${window.location.host}/api/thankyou/section?section_id=${data.row_section_id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      })
        .then((res) => {})
        .catch((err) => {});
    }
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      updateSectionAPI();
    }
  }, [content, section_id, characters, section_data]);

  return (
    <>
      <div className="select-prd-sec-new">
        <span
          className="hover-button-close"
          onClick={() => {
            setSection("section2");
            setLabel(
              areas === "general" ? "General Settings" : areas + " Area"
            );
          }}
        >
          <Icon source={MobileChevronMajor} color="base" />
        </span>
        <span>Social follow buttons</span>
      </div>
      <div className="panel-body min-height">
        <label className="custom-label">Settings</label>
        <div className="form-group">
          {content &&
            content.length > 0 &&
            content.map((cont, i) => {
              return (
                <React.Fragment key={i}>
                  <div>
                    <div className="d-flex justify-content-between">
                      <h5>CONTENT</h5>
                      <a
                        onClick={() => removeFields(i)}
                        className="social-banner"
                      >
                        Delete
                      </a>
                    </div>
                    <div>
                      <TextField
                        label="Contain"
                        type="text"
                        autoComplete="off"
                        multiline={8}
                        name="contains"
                        onChange={(e) => handleInputChange(e, i)}
                        value={cont.contains}
                      />
                    </div>
                    <hr />
                  </div>
                </React.Fragment>
              );
            })}

          <Button primary onClick={addFields}>
            Add more
          </Button>
          <div className="mt-3">
            <Banner title="" status="info">
              <p>
                To get Facebook code{" "}
                <a
                  className="social-banner"
                  href="https://developers.facebook.com/docs/plugins/page-plugin/"
                  target="_blank"
                  rel="noreferrer"
                >
                  click here.
                </a>
              </p>
            </Banner>
          </div>

          <div className="mt-3">
            <Banner title="" status="info">
              <p>
                To get Twitter code{" "}
                <a
                  className="social-banner"
                  href="https://publish.twitter.com/#"
                  target="_blank"
                  rel="noreferrer"
                >
                  click here.
                </a>
              </p>
            </Banner>
          </div>

          <div className="mt-3">
            <Banner title="" status="info">
              <p>
                To get Pinterest code{" "}
                <a
                  className="social-banner"
                  href="https://help.pinterest.com/en/business/article/build-a-website-widget"
                  target="_blank"
                  rel="noreferrer"
                >
                  click here.
                </a>
              </p>
            </Banner>
          </div>

          <div className="mt-3 pb-4">
            <Banner title="" status="info">
              <p>
                To get YouTube code{" "}
                <a
                  className="social-banner"
                  href="https://developers.google.com/youtube/youtube_subscribe_button"
                  target="_blank"
                  rel="noreferrer"
                >
                  click here.
                </a>
              </p>
            </Banner>
          </div>
        </div>
      </div>

      <div className="delete-section">
        <a
          className="Polaris-Button Polaris-Button--outline"
          onClick={() => deleteSectionAPI()}
        >
          <i className="fa fa-trash px-3" aria-hidden="true"></i>
          Delete Section
        </a>
        <a className="Polaris-Button Polaris-Button--outline">
          <Icon source={ViewMinor} color="base" />
        </a>
      </div>
    </>
  );
};

export default SocialFollow;

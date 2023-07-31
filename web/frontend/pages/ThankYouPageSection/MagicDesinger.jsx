import React, { useCallback, useState } from "react";
import { MagicMajor, MobileChevronMajor } from "@shopify/polaris-icons";
import { Icon, Checkbox, Banner } from "@shopify/polaris";
import { useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { SECTION_DETAILS } from "../../Store/consts";

const MagicDesinger = ({
  section_data,
  setSection,
  setLabel,
  section_id,
  characters,
  updateCharacters,
  areas,
}) => {
  const data = useSelector((state) => state.section_data);
  const dispatch = useDispatch();
  const app = useAppBridge();
  const [isMagic, setIsMagic] = useState(true);

  const handleChange = useCallback((newChecked) => setIsMagic(newChecked), []);

  useEffect(() => {
    if (Object.keys(section_data).length > 0) {
      dispatch({
        type: SECTION_DETAILS,
        payload: { ...section_data },
      });
      setIsMagic(section_data?.is_magic);
    }
  }, [section_data]);

  const updateSectionAPI = async () => {
    if (data?.section_id === section_data?.section_id.toString()) {
      let body = {
        is_magic: isMagic,
      };
      dispatch({
        type: `${SECTION_DETAILS}`,
        payload: { ...data, ...body },
      });
      let result = characters;
      var item = {
        id: data?.section_id,
        iconName: MagicMajor,
        is_fa_icon: data?.is_fa_icon,
        is_disabled: data?.is_disabled,
        name: data?.section_name,
        area: data?.area,
        section_data: {
          is_magic: isMagic,
          section_id: data?.section_id,
          section_name: data?.section_name,
        },
      };

      characters.forEach((element, index) => {
        if (
          element.id === data?.section_id &&
          element.name === data?.section_name
        ) {
          characters[index] = item;
        }
      });

      updateCharacters(result);
      const token = await getSessionToken(app);
      axios({
        url: `https://${window.location.host}/api/thankyou/section?section_id=${data.section_id}&type=general`,
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
  }, [isMagic, section_id, characters, section_data]);

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
        <span>Magic designer</span>
      </div>

      <div className="panel-body min-height">
        <label className="custom-label">Settings</label>
        <div className="form-group ">
          <div className="mt-3">
            All templates are up to date with your stores theme
          </div>

          <hr />

          <div>
            <h5>ENABLE MAGIC DESIGNER</h5>
          </div>

          <div className="mt-3">
            <Banner title="" status="warning">
              When disabled, new theme changes will never be synced to this
              template.
            </Banner>
          </div>

          <div className="mt-3 pb-4">
            <Checkbox
              label="Enable magic designer for this template."
              checked={isMagic}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MagicDesinger;

import {
  Card,
  Page,
  Layout,
  TextContainer,
  //   Heading,
  Button,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import React, { useState, useEffect } from "react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { Table } from "reactstrap";

export default function PageName() {
  const app = useAppBridge();
  const [scriptData, setScriptData] = useState([]);

  const GetAllScriptTags = async () => {
    const token = await getSessionToken(app);
    axios({
      url: `https://${window.location.host}/api/thankyou/script`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        setScriptData(data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    GetAllScriptTags();
  }, []);

  const AddScriptTag = async () => {
    const token = await getSessionToken(app);
    axios({
      url: `https://${window.location.host}/api/thankyou/script`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("res===================", res);
        GetAllScriptTags();
      })
      .catch((err) => {});
  };

  return (
    <Page>
      <TitleBar
        title="Page name"
        primaryAction={{
          content: "Primary action",
          onAction: () => console.log("Primary action"),
        }}
        secondaryActions={[
          {
            content: "Secondary action",
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            {/* <Heading>Heading</Heading> */}
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
          <Card sectioned>
            {/* <Heading>Heading</Heading> */}
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            {/* <Heading>Heading</Heading> */}
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            {/* <Heading>Script Tags</Heading> */}
            <div className="mt-3">
              <Button onClick={() => AddScriptTag()}>Add Script Tag</Button>
            </div>
            <div className="table-responsive mt-3">
              <Table hover responsive>
                <thead>
                  <tr className="text-center">
                    <th>SR.No.</th>
                    <th>Src </th>
                    <th>Display Scope</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {scriptData && scriptData.length === 0 && (
                    <tr className="text-center">
                      <td colSpan={4}>
                        <div
                          style={{
                            height: 100,
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className="mt-3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M143.9 398.6C131.4 394.1 124.9 380.3 129.4 367.9C146.9 319.4 198.9 288 256 288C313.1 288 365.1 319.4 382.6 367.9C387.1 380.3 380.6 394.1 368.1 398.6C355.7 403.1 341.9 396.6 337.4 384.1C328.2 358.5 297.2 336 256 336C214.8 336 183.8 358.5 174.6 384.1C170.1 396.6 156.3 403.1 143.9 398.6V398.6zM208.4 208C208.4 225.7 194 240 176.4 240C158.7 240 144.4 225.7 144.4 208C144.4 190.3 158.7 176 176.4 176C194 176 208.4 190.3 208.4 208zM304.4 208C304.4 190.3 318.7 176 336.4 176C354 176 368.4 190.3 368.4 208C368.4 225.7 354 240 336.4 240C318.7 240 304.4 225.7 304.4 208zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                          </svg>
                        </div>
                        <div className="mt-3 mb-3">Script data not found.</div>
                      </td>
                    </tr>
                  )}

                  {scriptData &&
                    scriptData.length > 0 &&
                    scriptData.map((script, index) => {
                      return (
                        <React.Fragment key={index}>
                          <GetScriptTag
                            index={index}
                            script={script}
                            GetAllScriptTags={GetAllScriptTags}
                          />
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

const GetScriptTag = ({ index, script, GetAllScriptTags }) => {
  const app = useAppBridge();
  const DeleteScriptTag = async (id) => {
    const token = await getSessionToken(app);
    axios({
      url: `https://${window.location.host}/api/thankyou/script?script_id=${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("res===================", res);
        GetAllScriptTags();
      })
      .catch((err) => {});
  };

  return (
    <tr className="text-center">
      <td>{index + 1}</td>
      <td>{script.src}</td>
      <td>{script.display_scope}</td>
      <td>
        <i
          className="fa fa-solid fa-trash"
          onClick={(e) => DeleteScriptTag(script.id)}
          style={{ cursor: "pointer" }}
        ></i>
      </td>
    </tr>
  );
};

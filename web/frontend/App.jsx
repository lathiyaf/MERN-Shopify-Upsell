import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import './assets/scss/main.scss';
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu
              navigationLinks={[
                {
                  label: "Page name",
                  destination: "/pagename",
                },
                {
                  label: "Product",
                  destination: "/product",
                },
                {
                  label: "Thank You Page",
                  destination: "/thank-you-page",
                },
              ]}
            />
            <Routes pages={pages} />
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
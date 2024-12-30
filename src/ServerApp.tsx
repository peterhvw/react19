import { useLocation } from "react-router-dom";
import App from "./App";
import { getDogs } from "./api/getDogs";
import Html from "./Html";

async function ServerApp({cssFiles}: {cssFiles: string[]})  {
    const location = useLocation();
    let initialBrowseData = null;
    let initialPlpData = null;
    let initialHomeData = null;

    if (location.pathname === '/browse') {
        initialBrowseData = await getDogs("boxer");
    }
    if (location.pathname === '/plp') {
        initialPlpData = "plp data";
    }
    if (location.pathname === '/') {
        initialHomeData = "home data";
    }

    return (
        <Html cssFiles={cssFiles} initialHomeData={initialHomeData} initialBrowseData={initialBrowseData} initialPlpData={initialPlpData} >
            <App initialHomeData={null} initialBrowseData={initialBrowseData} initialPlpData={null} />
        </Html> 
    )
  }

  export default ServerApp;
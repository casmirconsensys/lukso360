import { HuddleIframe } from "@huddle01/react-huddle-iframe";
// JavaScript | TypeScript
import { huddleIframeApp } from '@huddle01/huddle01-iframe';
// JavaScript
import { huddleIframeApp, HuddleAppEvent } from "@huddle01/huddle01-iframe";
 
huddleIframeApp.on("peer-join", (data) => console.log({ data }));
 
// TypeScript
 
huddleIframeApp.on(HuddleAppEvent.PEER_JOIN, (data) => console.log({ data }));
//format
huddleIframeApp.methods.methodName();
 
//e.g.
huddleIframeApp.methods.muteMic();

const iframeConfig = {
    roomUrl: "https://iframe.huddle01.com/123",
    height: "600px",
    width: "80%",
    noBorder: false, // false by default
};
 
function App() {
    return (
        <div>
            <HuddleIframe config={iframeConfig} />
        </div>
    );
}
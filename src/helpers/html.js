import React from "react";

export default {
    renderHTML: (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } })
}
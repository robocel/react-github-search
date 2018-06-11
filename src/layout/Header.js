import React from "react";

import { IconGithub } from "../icons";

export const Header = ({ query, onSearchChanged }) => (
  <ul className="py-1 bgc-1 flex-align-center list-style-none pl-0">
    <li className="mr-1">
      <IconGithub className="ml-1 c-1" />
    </li>
    {query.length > 0 ? (
      <li className="mr-1">
        <input
          className="c-1 no-border br-1 bgc-2 pxy-0"
          type="text"
          value={query}
          onChange={e => {
            if (onSearchChanged) {
              onSearchChanged(e.target.value);
            }
          }}
        />
      </li>
    ) : null}
    <li className="mr-1">
      <button
        className="c-1 text-decoration-none pointer no-border bg-t"
        onClick={() => {
          onSearchChanged("");
        }}
      >
        Search
      </button>
    </li>
  </ul>
);

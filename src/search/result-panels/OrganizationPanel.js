import React from "react";

import {
  IconFollower,
  IconLocation,
  IconMail,
  IconRepository
} from "../../icons";

/**
 * There's definitey a BasePanel component somewhere in here
 * that unifies Organizations and Users. TODO: If there's time,
 * extract a common BasePanel component if one makes sense.
 */
export const OrganizationPanel = ({ org }) => (
  <div className="fs-5 flex result-panel">
    <img
      className="result-panel-avatar br-1"
      src={org.avatarUrl}
      alt={"@" + org.login}
    />
    <div className="fs-3 flex-grow fw-2 ml-2 result-panel-data">
      <div>
        <a href={org.url} className="text-decoration-none">
          {org.login}
        </a>{" "}
        <span className="fs-2 ml-2">{org.name}</span>
      </div>

      {org.description ? (
        <div className="fs-5 mt-2 mb-2">{org.description}</div>
      ) : null}

      <ul className="flex fs-4 list-style-none pl-0 mb-0 mt-2">
        {org.location ? (
          <li className="mr-2">
            <IconLocation /> {org.location}
          </li>
        ) : null}

        {org.email ? (
          <li className="mr-2">
            <IconMail /> <a href={`mailto://${org.email}`}>{org.email}</a>
          </li>
        ) : null}

        <li className="mr-2">
          <IconFollower /> Members: {org.members.totalCount}
        </li>

        <li className="mr-2">
          <IconRepository /> Repositories: {org.repositories.totalCount}
        </li>
      </ul>
    </div>
  </div>
);

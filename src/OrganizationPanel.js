import React from "react";

export const OrganizationPanel = ({ org }) => (
  <div
    style={{
      display: "flex",
      "flex-direction": "row"
    }}
  >
    <div>
      <img
        src={org.avatarUrl}
        alt={"@" + org.login}
        width="48px"
        height="48px"
      />
    </div>
    <div
      style={{
        "flex-grow": "1"
      }}
    >
      <div>
        <a href={org.url}>{org.login}</a> <span>{org.name}</span>
      </div>
      <div>{org.description}</div>
      <div>
        {org.location} {org.email}
      </div>
      <div>
        Members: {org.members.totalCount} Repositories:{" "}
        {org.repositories.totalCount}
      </div>
    </div>
  </div>
);

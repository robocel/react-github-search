import React from "react";
import { IconFollower } from "./IconFollower";
import { IconLocation } from "./IconLocation";
import { IconMail } from "./IconMail";
import { IconRepository } from "./IconRepository";

export const UserPanel = ({ user }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      paddingTop: "24px",
      paddingBottom: "24px",
      fontSize: "14px",
      borderTop: "1px solid #e1e4e8"
    }}
  >
    <div>
      <img
        src={user.avatarUrl}
        alt={"@" + user.login}
        width="48px"
        height="48px"
        style={{ borderRadius: "3px" }}
      />
    </div>
    <div
      style={{
        flexGrow: "1",
        minHeight: "48px",
        fontSize: "18px",
        fontWeight: "400",
        lineHeight: "20px",
        marginLeft: "8px"
      }}
    >
      <div>
        <a href={user.url} style={{ textDecoration: "none" }}>
          {user.login}
        </a>{" "}
        <span style={{ fontSize: "16px", marginLeft: "4px" }}>{user.name}</span>
      </div>
      {user.bio ? (
        <div
          style={{ fontSize: "14px", marginTop: "8px", marginBottom: "10px" }}
        >
          {user.bio}
        </div>
      ) : null}
      <ul
        style={{
          fontSize: "12px",
          marginTop: "8px",
          display: "flex",
          listStyle: "none",
          paddingLeft: "0",
          marginBottom: "0"
        }}
      >
        {user.location ? (
          <li style={{ marginRight: "16px" }}>
            <IconLocation /> {user.location}
          </li>
        ) : null}
        {user.email ? (
          <li style={{ marginRight: "16px" }}>
            <IconMail /> <a href={`mailto://${user.email}`}>{user.email}</a>
          </li>
        ) : null}
        <li style={{ marginRight: "16px" }}>
          <IconFollower /> Followers: {user.followers.totalCount}
        </li>
        <li style={{ marginRight: "16px" }}>
          <IconRepository /> Repositories: {user.repositories.totalCount}
        </li>
      </ul>
    </div>
  </div>
);

import React from "react";
import { IconFollower, IconLocation, IconMail, IconRepository } from "../icons";

export const UserPanel = ({ user }) => (
  <div
    className="fs-5 flex"
    style={{
      paddingTop: "24px",
      paddingBottom: "24px",
      borderTop: "1px solid #e1e4e8"
    }}
  >
    <div>
      <img
        src={user.avatarUrl}
        alt={"@" + user.login}
        width="48px"
        height="48px"
        className="br-1"
      />
    </div>
    <div
      className="fs-3 flex-grow fw-2 ml-2"
      style={{
        minHeight: "48px",
        lineHeight: "20px"
      }}
    >
      <div>
        <a href={user.url} className="text-decoration-none">
          {user.login}
        </a>{" "}
        <span className="fs-2" style={{ marginLeft: "4px" }}>
          {user.name}
        </span>
      </div>
      {user.bio ? (
        <div className="fs-5 mt-2" style={{ marginBottom: "10px" }}>
          {user.bio}
        </div>
      ) : null}
      <ul className="flex fs-4 list-style-none pl-0 mb-0 mt-2">
        {user.location ? (
          <li className="mr-2">
            <IconLocation /> {user.location}
          </li>
        ) : null}
        {user.email ? (
          <li className="mr-2">
            <IconMail /> <a href={`mailto://${user.email}`}>{user.email}</a>
          </li>
        ) : null}
        <li className="mr-2">
          <IconFollower /> Followers: {user.followers.totalCount}
        </li>
        <li className="mr-2">
          <IconRepository /> Repositories: {user.repositories.totalCount}
        </li>
      </ul>
    </div>
  </div>
);

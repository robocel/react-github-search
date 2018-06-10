import React from "react";

export const UserPanel = ({ user }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row"
    }}
  >
    <div>
      <img
        src={user.avatarUrl}
        alt={"@" + user.login}
        width="48px"
        height="48px"
      />
    </div>
    <div
      style={{
        flexGrow: "1"
      }}
    >
      <div>
        <a href={user.url}>{user.login}</a> <span>{user.name}</span>
      </div>
      <div>{user.bio}</div>
      <div>
        {user.location} {user.email}
      </div>
      <div>
        Followers: {user.followers.totalCount} Repositories:{" "}
        {user.repositories.totalCount}
      </div>
    </div>
  </div>
);

import React from "react";

function Nav({ setCounter }) {
  return (
    <nav>
      <div className="name_logo">
        <div className="logo">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <title />
            <g data-name="1" id="_1">
              <path d="M397.78,316H192.65A15,15,0,0,1,178,304.33L143.46,153.85a15,15,0,0,1,14.62-18.36H432.35A15,15,0,0,1,447,153.85L412.4,304.33A15,15,0,0,1,397.78,316ZM204.59,286H385.84l27.67-120.48H176.91Z" />
              <path d="M222,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,222,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,222,365.05Z" />
              <path d="M368.42,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,368.42,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,368.42,365.05Z" />
              <path d="M158.08,165.49a15,15,0,0,1-14.23-10.26L118.14,78H70.7a15,15,0,1,1,0-30H129a15,15,0,0,1,14.23,10.26l29.13,87.49a15,15,0,0,1-14.23,19.74Z" />
            </g>
          </svg>
        </div>
        <div className="name">Store_name</div>
      </div>
      <div className="links">
        <ul>
          <li>
            <a href="/" className="active">
              Sell
            </a>
          </li>
          <li>
            <a href="/allProduct">All products</a>
          </li>
          <li>History</li>
          <li>Account</li>
          <li>Log out</li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

import { css } from "@emotion/react";

const globalStyles = css`
  html,
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  input,
  textarea {
    padding: 0;
    margin: 0;
    word-break: keep-all;
    word-wrap: break-word;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      filter: brightness(90%);
      opacity: 0.6;
    }
  }

  input[type="radio"],
  input[type="checkbox"],
  .input-label {
    cursor: pointer;
  }
`;

export default globalStyles;

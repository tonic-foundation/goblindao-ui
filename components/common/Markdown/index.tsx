import remarkBreaks from 'remark-breaks';
import ReactMarkdown from 'react-markdown';
import React, { FC } from 'react';
import { css } from 'twin.macro';

const Markdown: FC<{ children?: string }> = ({ children }) => {
  return (
    <ReactMarkdown
      css={css`
        & {
          font-size: 0.925rem;
          font-weight: 100;

          h1 {
            font-size: 1.7rem;
            margin-top: 1rem;
            font-weight: bold;
          }

          h2 {
            font-size: 1.5rem;
            margin-top: 1rem;
            font-weight: bold;
          }

          h3 {
            font-weight: bold;
            font-size: 1.3rem;
          }
          p {
            padding-top: 1rem;
            margin-bottom: 1rem;
          }

          li,
          p {
            opacity: 0.7;
          }

          a {
            color: #ca3a31;
            text-decoration: underline;
          }

          hr {
            margin: 1rem 0;
          }

          img {
            max-width: 100%;
            height: auto;
          }
        }
      `}
      remarkPlugins={[remarkBreaks]}
    >
      {children || ''}
    </ReactMarkdown>
  );
};

export default Markdown;

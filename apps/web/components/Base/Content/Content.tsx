import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import styles from "./Content.module.scss";
import React from "react";

type ContentProps = {
  content: BlocksContent;
};

const Content: React.FC<ContentProps> = ({ content }) => {
  return (
    <div className={styles["content-wrapper"]}>
      <BlocksRenderer content={content} />
    </div>
  );
};

export { Content };

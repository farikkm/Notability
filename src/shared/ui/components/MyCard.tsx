import React from "react";
import { Card } from "antd";
import { NoteType } from "shared/types";

export const MyCard: React.FC<NoteType> = ({ content, title }) => (
  <Card title={title} variant="borderless" style={{ width: 500 }}>
    <p>{content}</p>
  </Card>
);

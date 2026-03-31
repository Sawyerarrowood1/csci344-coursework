import React from "react";
import { Card, Image } from "antd";

export default function AntCard({ name, image_url, description }) {
  return (
    <Card
      style={{ width: 300 }}
      cover={<Image alt={name} src={image_url} />}
    >
      <Card.Meta title={name} description={description} />
    </Card>
  );
}
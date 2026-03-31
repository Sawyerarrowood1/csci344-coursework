import React from "react";
import Card from "./components/Card";
import AntCard from "./components/AntCard";
import { Image, Carousel, Collapse } from "antd";

export default function App() {
  return (
    <>
      <header>
        <h1>My First App</h1>
      </header>

      <main>
        <p>Hello React!</p>

        <Image
          width={200}
          alt="basic"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />

        <Card
          name="Sample item"
          image_url="https://picsum.photos/id/237/400/300"
          description="A short description goes here."
        />

        <Card
          name="Another item"
          image_url="https://picsum.photos/id/1025/400/300"
          description="This is another card with different content."
        />

        <AntCard
          name="Ant Design Card"
          image_url="https://picsum.photos/id/1062/400/300"
          description="This card uses Ant Design."
        />

        <Carousel autoplay style={{ width: 300, marginTop: 20 }}>
          <div>
            <h3 style={{ color: "white" }}>Slide 1</h3>
          </div>
          <div>
            <h3 style={{ color: "white" }}>Slide 2</h3>
          </div>
          <div>
            <h3 style={{ color: "white" }}>Slide 3</h3>
          </div>
        </Carousel>

        <Collapse
          style={{ width: 300, marginTop: 20 }}
          items={[
            {
              key: "1",
              label: <span style={{ color: "white" }}>More Info</span>,
              children: (
                <p style={{ color: "black" }}>
                  This is extra content inside Collapse.
                </p>
              ),
            },
          ]}
        />
      </main>
    </>
  );
}
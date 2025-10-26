import Container from "@/components/ui/Container";
import { Title } from "@/components/ui/text";
import React from "react";

const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <div>
      <Container>
        <Title>SingleBlogPage</Title>
        <p>{slug}</p>
      </Container>
    </div>
  );
};

export default SingleBlogPage;

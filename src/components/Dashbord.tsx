import React from "react";

interface Props {
  code: string | null;
}

export const Dashbord = (props: Props) => {
  const { code } = props;
  return <div>{code}</div>;
};

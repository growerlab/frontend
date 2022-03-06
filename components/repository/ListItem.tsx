import React from "react";
import Link from "next/link";
import { repoIcon } from "./common";

interface Args {
  path: string;
  name: string;
  description: string;
  pub: boolean;
}

export function ListItem(props: Args) {
  const { pub, path, name, description } = props;

  return (
    <div>
      <Link href={path}>
        {repoIcon(pub)} {name}{" "}
      </Link>
      <h4>{description}</h4>
    </div>
  );
}

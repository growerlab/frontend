import React from 'react';
import {getTitle} from '../common/document';
import Link from "next/link";

export default function () {
  getTitle('404 Not Found');

  return (
    <div>
      <Link href="/">
        Back Home
      </Link>
    </div>
  );
}

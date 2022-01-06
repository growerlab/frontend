import React from 'react';
import { setTitle } from '../common/document';
import Link from "next/link";

export default function() {
  setTitle('404 Not Found');

  return (
    <div>
      <Link href="/">
        Back Home
      </Link>
    </div>
  );
}

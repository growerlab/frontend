import React from 'react';
import UserLayout from './user';
import IndexLayout from './index';
import NamespaceLayout from './namespace';

export default function(props: React.PropsWithChildren<any>) {
  const path = props.location.pathname;

  switch (true) {
    case /^\/user\//.test(path):
      return <UserLayout>{props.children}</UserLayout>;
    case /^\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_\-\.]{2,50}/.test(path):
      return <NamespaceLayout>{props.children}</NamespaceLayout>;
    case /^\//.test(path):
      return <IndexLayout>{props.children}</IndexLayout>;
  }
  return;
}

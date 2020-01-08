import React from 'react';
import UserLayout from './user';
import IndexLayout from './index';

export default function(props: any) {
  let path = props.location.pathname;
  switch (true) {
    case /^\/user\//.test(path):
      return <UserLayout>{props.children}</UserLayout>;
    case /^\//.test(path):
      return <IndexLayout>{props.children}</IndexLayout>;
  }
  return;
}

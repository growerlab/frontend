import React from 'react';
import IndexLayout from '.';
import UserLayout from '.';

export default function(props: any) {
  let path = props.location.pathname;
  var subLayout;
  switch (true) {
    case /^\/user\//.test(path):
      subLayout = <UserLayout>{props.children}</UserLayout>;
      break;
    case /^\//.test(path):
      subLayout = <IndexLayout>{props.children}</IndexLayout>;
      break;
  }
  return subLayout;
}

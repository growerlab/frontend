import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { withTranslation } from "react-i18next";

import { Session } from "../../services/auth/session";
import { Message } from "../../api/common/notice";
import { Router } from "../../config/router";

// const {Header, Sider, Content} = Layout;

function UserLayout(props: any) {
  const { t } = props;
  const router = useRouter();

  useEffect((): void => {
    // 验证用户是否登录
    Session.isLogin().catch(() => {
      Message.Warning(t("user.tooltip.not_login"));
      router.push(Router.Home.Login);
    });
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [collapsed, setCollapsed] = useState(false);
  const plusMenu = (
    <Link href={Router.User.Repository.New}>{t("repository.new")}</Link>
  );

  const logoutClick = (): void => {
    Session.logout(router);
  };

  const userMenu = (
    <div>
      <span>用户管理</span>
      <Link passHref href={""}>
        <a
          onClick={() => logoutClick()}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
        >
          {t("user.logout")}
        </a>
      </Link>
    </div>
  );

  // const path = window.location.pathname.split('/').slice(0, 3);
  // const menuKey = [path.join('/')];

  return (
    <div>
      <div className="flex flex-row fixed bottom-0 w-full top-0">
        <div className="bg-blue-800 ">
          <nav className="flex flex-col h-full">
            <div className="flex-none">
              <div>
                <a
                  href="#"
                  className="bg-blue-900 text-white block px-3 py-5  text-base font-medium text-center"
                  aria-current="page"
                >
                  GrowerLab
                </a>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {[
                  ["Home", Router.User.Index],
                  [t("repository.list"), Router.User.Repository.List],
                  ["Projects", "/"],
                ].map(([title, url]) => (
                  <a
                    href={url}
                    className=" text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-900"
                  >
                    {title}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex-auto">{/* 填充 */}</div>
            <div className="flex-none">
              <div className=" bottom-0 pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      tom@example.com
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1 ">
                  {[
                    ["Your Profile", "/"],
                    ["Settings", "/"],
                    ["Sign out", "/"],
                  ].map(([title, url]) => (
                    <a
                      href={url}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {title}
                    </a>
                  ))}
                  {userMenu}
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="grow">
          <div className="flex flex-col h-full">
            <header className="bg-white shadow">
              <div className="max-w-full  mx-auto py-3 px-4 sm:px-2 lg:px-6">
                <h1 className="text-1xl text-gray-800">{props.title}</h1>
              </div>
            </header>
            <main>
              <div className="max-w-full mx-auto py-4 sm:px-4 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                  <div className="border-0 border-dashed border-gray-200 rounded-lg max-h-full">
                    {props.children}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation()(UserLayout);

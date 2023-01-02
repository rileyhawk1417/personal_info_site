import { Menu } from "@headlessui/react";
import React, { ReactNode } from "react";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

type Props = {
  href: string;
  children: ReactNode;
};

const DropDownMenuItem = ({ href, children }: Props) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={href}
          className={classNames(
            active ? "bg-orange-200 dark:bg-zinc-700" : "",
            "block px-4 y-2 text-sm"
          )}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  );
};

export default DropDownMenuItem;

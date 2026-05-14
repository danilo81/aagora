"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

// ── Contexts ──────────────────────────────────────────────────────────────────

type MenuCtx = {
  openId: string | null;
  setOpenId: (id: string | null) => void;
};
const MenuContext = React.createContext<MenuCtx>({ openId: null, setOpenId: () => { } });

type ItemCtx = { id: string; isOpen: boolean; toggle: () => void };
const ItemContext = React.createContext<ItemCtx>({ id: "", isOpen: false, toggle: () => { } });

// ── NavigationMenu ─────────────────────────────────────────────────────────────

function NavigationMenu({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenId(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <MenuContext.Provider value={{ openId, setOpenId }}>
      <div
        ref={ref}
        data-slot="navigation-menu"
        className={cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className)}
        {...props}
      >
        {children}
      </div>
    </MenuContext.Provider>
  );
}

// ── NavigationMenuList ─────────────────────────────────────────────────────────

function NavigationMenuList({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-0", className)}
      {...props}
    />
  );
}

// ── NavigationMenuItem ─────────────────────────────────────────────────────────

function NavigationMenuItem({ className, children, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  const id = React.useId();
  const { openId, setOpenId } = React.useContext(MenuContext);
  const isOpen = openId === id;
  const toggle = React.useCallback(
    () => setOpenId(isOpen ? null : id),
    [id, isOpen, setOpenId]
  );

  return (
    <ItemContext.Provider value={{ id, isOpen, toggle }}>
      <li
        data-slot="navigation-menu-item"
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </li>
    </ItemContext.Provider>
  );
}

// ── NavigationMenuTrigger ──────────────────────────────────────────────────────

const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50"
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isOpen, toggle } = React.useContext(ItemContext);

  return (
    <button
      type="button"
      data-slot="navigation-menu-trigger"
      data-state={isOpen ? "open" : "closed"}
      onClick={toggle}
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      {/* <ChevronDownIcon
        className={cn(
          "relative top-px ml-1 size-3 transition duration-300",
          isOpen && "rotate-180"
        )}
        aria-hidden="true"
      /> */}
    </button>
  );
}

// ── NavigationMenuContent ──────────────────────────────────────────────────────

function NavigationMenuContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = React.useContext(ItemContext);

  if (!isOpen) return null;

  return (
    <div
      data-slot="navigation-menu-content"
      className={cn(
        "absolute top-full left-0 z-50 mt-1.5 animate-in fade-in zoom-in-95",
        className
      )}
      {...props}
    />
  );
}

// ── NavigationMenuLink ─────────────────────────────────────────────────────────

function NavigationMenuLink({
  className,
  asChild,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      data-slot="navigation-menu-link"
      className={cn(
        "flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...(props as any)}
    />
  );
}

// ── NavigationMenuViewport (stub — kept for API compatibility) ─────────────────

function NavigationMenuViewport(_props: React.HTMLAttributes<HTMLDivElement>) {
  return null;
}

// ── NavigationMenuIndicator (stub — kept for API compatibility) ───────────────

function NavigationMenuIndicator(_props: React.HTMLAttributes<HTMLDivElement>) {
  return null;
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};

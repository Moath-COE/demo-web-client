"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/navigation-menu";
import Image from "next/image";
import { set } from "zod/v4";

export function TopNav({
  setMenuOpen,
  menuOpen,
}: {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
}) {
  return (
    <NavigationMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
  );
}

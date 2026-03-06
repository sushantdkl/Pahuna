"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ChevronDown, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "@/components/layout/container";
import { mainNavigation } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
              <Mountain className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight tracking-tight">
                {SITE_CONFIG.name}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {SITE_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5">
            {mainNavigation.map((item) =>
              item.children ? (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    aria-expanded={openDropdown === item.title}
                    aria-haspopup="true"
                    onFocus={() => setOpenDropdown(item.title)}
                    onBlur={(e) => {
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                        setOpenDropdown(null);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setOpenDropdown(null);
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpenDropdown(openDropdown === item.title ? null : item.title);
                      }
                    }}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/50">
                    {item.title}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" style={{
                      transform: openDropdown === item.title ? 'rotate(180deg)' : 'rotate(0deg)'
                    }} />
                  </button>
                  {openDropdown === item.title && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1">
                      <div className="w-72 rounded-xl border bg-popover/95 backdrop-blur-xl p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95 duration-150" role="menu">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            onBlur={(e) => {
                              if (!e.currentTarget.closest('[role="menu"]')?.contains(e.relatedTarget)) {
                                setOpenDropdown(null);
                              }
                            }}
                            className="block rounded-lg px-3.5 py-2.5 hover:bg-accent transition-colors"
                          >
                            <div className="text-sm font-medium">
                              {child.title}
                            </div>
                            {child.description && (
                              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/50"
                >
                  {item.title}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-2.5">
            <Button asChild size="sm" className="hidden sm:inline-flex shadow-sm">
              <Link href="/contact">Get in Touch</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b px-4 py-4">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Mountain className="h-4 w-4" />
                      </div>
                      <span className="font-bold">{SITE_CONFIG.name}</span>
                    </Link>
                  </div>
                  <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-4">
                    <div className="space-y-1">
                      {mainNavigation.map((item) =>
                        item.children ? (
                          <div key={item.title} className="space-y-1">
                            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              {item.title}
                            </div>
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
                          >
                            {item.title}
                          </Link>
                        )
                      )}
                    </div>
                  </nav>
                  <div className="border-t p-4">
                    <Button
                      asChild
                      className="w-full"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href="/contact">Get in Touch</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}

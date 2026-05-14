# Graph Report - aagora  (2026-05-01)

## Corpus Check
- 108 files · ~75,894 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 293 nodes · 205 edges · 5 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 14|Community 14]]

## God Nodes (most connected - your core abstractions)
1. `RootLayout()` - 6 edges
2. `ThemeProvider()` - 5 edges
3. `isTypingTarget()` - 5 edges
4. `ThemeHotkey()` - 5 edges
5. `useCarousel()` - 2 edges
6. `CarouselNext()` - 2 edges
7. `useSidebar()` - 2 edges
8. `SidebarMenuButton()` - 2 edges
9. `DOMException` - 1 edges
10. `CompileError` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (42): AbortController, Blob, ByteLengthQueuingStrategy, CloseEvent, CompileError, CompressionStream, CountQueuingStrategy, CustomEvent (+34 more)

### Community 3 - "Community 3"
Cohesion: 0.54
Nodes (3): isTypingTarget(), ThemeHotkey(), ThemeProvider()

### Community 5 - "Community 5"
Cohesion: 0.29
Nodes (1): RootLayout()

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (2): SidebarMenuButton(), useSidebar()

### Community 14 - "Community 14"
Cohesion: 0.5
Nodes (2): CarouselNext(), useCarousel()

## Knowledge Gaps
- **42 isolated node(s):** `DOMException`, `CompileError`, `RuntimeError`, `Global`, `Instance` (+37 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 5`** (7 nodes): `RootLayout()`, `layout.tsx`, `layout.tsx`, `layout.tsx`, `layout.tsx`, `layout.tsx`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (7 nodes): `cn()`, `handleKeyDown()`, `SidebarMenu()`, `SidebarMenuButton()`, `SidebarMenuItem()`, `useSidebar()`, `sidebar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (5 nodes): `Carousel()`, `CarouselNext()`, `cn()`, `useCarousel()`, `carousel.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `DOMException`, `CompileError`, `RuntimeError` to the rest of the system?**
  _42 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
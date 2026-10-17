import type { Root, RootContent, Table } from "mdast";

// Enforce the mobile layout even for older replies or unexpected model output.
// Transform the parsed Markdown so inline links and emphasis remain intact.
function tableToSections(table: Table): RootContent[] {
  const [header, ...rows] = table.children;
  if (!header) return [];

  return rows.flatMap((row) => {
    const [title, ...cells] = row.children;
    const section: RootContent[] = [];
    if (title?.children.length) {
      section.push({ type: "heading", depth: 3, children: title.children });
    }
    const items = cells.flatMap((cell, index) => {
      if (!cell.children.length) return [];
      const label = header.children[index + 1]?.children || [];
      return [{
        type: "listItem" as const,
        spread: false,
        children: [{
          type: "paragraph" as const,
          children: [
            ...(label.length ? [
              { type: "strong" as const, children: label },
              { type: "text" as const, value: ": " },
            ] : []),
            ...cell.children,
          ],
        }],
      }];
    });
    if (items.length) {
      section.push({ type: "list", ordered: false, spread: false, children: items });
    }
    return section;
  });
}

export function remarkTablesToSections() {
  return (tree: Root) => {
    function visit(parent: { children?: unknown[] }) {
      if (!parent.children) return;
      for (let index = 0; index < parent.children.length; index++) {
        const child = parent.children[index] as { type: string; children?: unknown[] };
        if (child.type === "table") {
          const sections = tableToSections(child as Table);
          parent.children.splice(index, 1, ...sections);
          index += sections.length - 1;
        } else {
          visit(child);
        }
      }
    }
    visit(tree);
  };
}

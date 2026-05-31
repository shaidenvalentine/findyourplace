"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { copyText } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

export function CopyLinkButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function go() {
    const ok = await copyText(text);
    setCopied(ok);
    if (ok) setTimeout(() => setCopied(false), 1500);
  }
  return (
    <Button variant="outline" size="icon" onClick={go} aria-label="Copy">
      {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
    </Button>
  );
}

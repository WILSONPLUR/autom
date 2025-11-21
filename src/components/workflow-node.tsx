"use client";
import { NodeToolbar, Position } from "@xyflow/react";
import React from "react";
import { Button } from "./ui/button";
import { SettingsIcon, TrashIcon } from "lucide-react";

interface WorkflowNodeProps {
  children?: React.ReactNode;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSettings?: () => void;
  name?: string;
  description?: string;
}
export function WorkflowNode({
  children,
  showToolbar = true,
  onDelete,
  onSettings,
  name,
  description,
}: WorkflowNodeProps) {
  return (
    <>
      {showToolbar && (
        <NodeToolbar>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className={"mr-2"}
          >
            <SettingsIcon />
          </Button>
          <Button size={"sm"} variant="ghost" onClick={onDelete}>
            <TrashIcon />
          </Button>
        </NodeToolbar>
      )}
      {children}
      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="max-w-[200px] text-center"
        >
          <p className="font-medium">{name}</p>
          {description && (
            <p className="text-muted-foreground trunacte text-sm">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  );
}

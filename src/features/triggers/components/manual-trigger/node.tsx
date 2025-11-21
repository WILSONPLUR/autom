"use client";
import type { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;
export const ManualTriggerNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const nodeData = props.data as HttpRequestNodeData;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "Not configured";
  return (
    <>
      <BaseTriggerNode
        {...props}
        id={props.id}
        name="Manual Trigger: when click 'Execute workflow'"
        description={description}
        icon={MousePointerIcon}
        onSettings={() => {}}
        onDoubleClick={() => {}}
      />
    </>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";

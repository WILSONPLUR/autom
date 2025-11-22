"use client";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { HttpRequestDialog } from "./dialog";
type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;
export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [openDialog, setOpenDialog] = useState(false);
  const nodeData = props.data;
  const { setNodes } = useReactFlow();
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "Not configured";

  const handleSubmit = (values: {
    endpoint: string;
    method: string;
    body?: string;
  }) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              endpoint: values.endpoint,
              method: values.method,
              body: values.body,
            },
          };
        }
        return node;
      })
    );
  };
  return (
    <>
      <BaseExecutionNode
        {...props}
        id={props.id}
        name="HTTP Request"
        description={description}
        icon={GlobeIcon}
        onSettings={() => setOpenDialog(true)}
        onDoubleClick={() => setOpenDialog(true)}
      />
      <HttpRequestDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSubmit={handleSubmit}
        defaultEndpoint={nodeData.endpoint}
        defaultMethod={nodeData.method}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";

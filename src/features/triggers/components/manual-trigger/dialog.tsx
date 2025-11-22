import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualTriggerDialog = ({ open, onOpenChange }: DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Trigger</DialogTitle>
          <DialogDescription>
            Configure settings for the manual trigger node.
          </DialogDescription>
          Expected corresponding JSX closin
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

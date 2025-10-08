import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type AlertDialogDemoProps = {
  titleAlert?: string;
  descriptionAlert: string;
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  handleContinue?: () => void;
};

export const AlertDialogDemo = ({
  titleAlert = "npm dlx shadcn@latest add alert-dialog",
  descriptionAlert,
  showDialog,
  setShowDialog,
  handleContinue,
}: AlertDialogDemoProps) => {
  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titleAlert}</AlertDialogTitle>
          <AlertDialogDescription>{descriptionAlert}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

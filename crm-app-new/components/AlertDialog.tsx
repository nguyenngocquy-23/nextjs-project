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
import { mainAction } from "@/type";

type AlertDialogDemoProps = {
  titleAlert?: string;
  mainAction: mainAction;
  descriptionAlert: string;
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  handleContinue?: () => void;
  children?: React.ReactNode;
};

export const AlertDialogDemo = ({
  mainAction,
  titleAlert = "npm dlx shadcn@latest add alert-dialog",
  descriptionAlert,
  showDialog,
  setShowDialog,
  handleContinue,
  children,
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
          {!children ? (
            <AlertDialogAction
              className={
                mainAction == "Continue" ||
                mainAction == "Submit" ||
                mainAction == "Save"
                  ? "bg-black"
                  : "bg-red-600"
              }
              onClick={handleContinue}
            >
              {mainAction}
            </AlertDialogAction>
          ) : (
            children
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

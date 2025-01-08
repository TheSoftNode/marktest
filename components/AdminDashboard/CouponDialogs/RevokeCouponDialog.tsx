// import React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   FormControl,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";

// interface RevokeCouponDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onRevoke: () => Promise<void>;
//   revokeReason: string;
//   onReasonChange: (reason: string) => void;
//   selectedCouponCode?: string | null;
// }

// export const RevokeCouponDialog = ({
//   open,
//   onOpenChange,
//   onRevoke,
//   revokeReason,
//   onReasonChange,
//   selectedCouponCode
// }: RevokeCouponDialogProps) => {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="text-violet-700">Revoke Coupon</DialogTitle>
//           <DialogDescription>
//             Are you sure you want to revoke {selectedCouponCode ? `coupon "${selectedCouponCode}"` : 'this coupon'}? 
//             This action cannot be undone.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="space-y-4 py-4">
//           <FormItem>
//             <FormLabel>Reason for Revocation</FormLabel>
//             <FormControl>
//               <Textarea
//                 placeholder="Enter reason for revoking the coupon"
//                 value={revokeReason}
//                 onChange={(e) => onReasonChange(e.target.value)}
//                 className="focus-visible:ring-violet-500 resize-none min-h-[100px]"
//               />
//             </FormControl>
//           </FormItem>
//         </div>
//         <DialogFooter className="gap-2 sm:gap-0">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => onOpenChange(false)}
//             className="border-violet-200 hover:bg-violet-50"
//           >
//             Cancel
//           </Button>
//           <Button
//             type="button"
//             variant="destructive"
//             onClick={onRevoke}
//             className="bg-red-600 hover:bg-red-700"
//           >
//             Revoke Coupon
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

import React from 'react';
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RevokeCouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRevoke: () => Promise<void>;
  revokeReason: string;
  onReasonChange: (reason: string) => void;
  selectedCouponCode?: string | null;
}

interface RevokeFormValues {
  reason: string;
}

export const RevokeCouponDialog = ({
  open,
  onOpenChange,
  onRevoke,
  revokeReason,
  onReasonChange,
  selectedCouponCode
}: RevokeCouponDialogProps) => {
  const form = useForm<RevokeFormValues>({
    defaultValues: {
      reason: revokeReason
    }
  });

  // Update form value when revokeReason prop changes
  React.useEffect(() => {
    form.setValue('reason', revokeReason);
  }, [revokeReason, form]);

  const onSubmit = async (data: RevokeFormValues) => {
    onReasonChange(data.reason);
    await onRevoke();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-violet-700">Revoke Coupon</DialogTitle>
              <DialogDescription>
                Are you sure you want to revoke {selectedCouponCode ? `coupon "${selectedCouponCode}"` : 'this coupon'}? 
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Revocation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter reason for revoking the coupon"
                        className="focus-visible:ring-violet-500 resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-violet-200 hover:bg-violet-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                Revoke Coupon
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { API_ENDPOINTS } from "@/config/api";
import { useApi } from "@/hooks/useApi";
import { ChildLoginResponse, ChildSignupResponse, NewChildInfo, ParentInfo } from "@/types/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserPlus } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { Suspense } from "react";

const childSchema = yup
  .object({
    firstname: yup
      .string()
      .required("First name is required"),
    lastname: yup
      .string()
      .required("Last name is required"),
    class: yup
      .string()
      .required("Class is required"),
   
  })
  .required();

type FormData = {
  firstname: string;
  lastname: string;
  class: string;
};

function ChildrenSelection() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const params = searchParams.get("params");

  const [parentInfo, setParentInfo] = useState<ParentInfo | null>(null);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [hasChild, setHasChild] = useState(false);
  const [createdChild, setCreatedChild] = useState<ChildSignupResponse | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { execute: createChild } = useApi<ChildSignupResponse>();
  const {execute: childLogin} = useApi<ChildLoginResponse>()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(childSchema) as any,
    defaultValues: {
      firstname: "",
      lastname: "",
      class: "",  
    },
  });


  const handleAddChild = async(data:NewChildInfo) => {
    setLoading(true);
    const reqBody = {
      ...data,
      parent_id: parentInfo?.parent.parent_id
    }

    const result = await createChild(API_ENDPOINTS.CHILD_SIGNUP, {
      method: "POST",
      body: JSON.stringify(reqBody),
    });

    if (result?.error) {
      setError("Cannot create child");
    } else {
      setLoading(false);
      setHasChild(true);
      setAddDialogOpen(false);
      setCreatedChild(result?.data);
    }
  };

  const handleChildSelect = async (childId: string) => {
    const res = await signIn("credentials", {
      userId: childId,
      redirect: false,
    });

    // setLoading(false);

    if (res?.error) {
      setError("Invalid child ID");
    } else {
      router.push("/dashboard");
      toast("Success")

    }
  };

  useEffect(() => {
    try {
      const data = params ? JSON.parse(params) : null;
   
      if (data && typeof data === 'object') {
        // Check if data has a children array
        if (Array.isArray(data.children)) {
          
          setParentInfo(data as ParentInfo);
          if(data.children.length !== 0){
           setHasChild(true);
          }
         
        } else {
          setError("Invalid data format received");
        }
      } else {
        setError("Invalid data format received");
      }
    } catch (error) {
      setError("Failed to parse data");
    }
  }, []);

  return (
    <div className="container mx-auto p-6 pt-24">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!hasChild ? (
        <Card className="p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <UserPlus className="h-16 w-16 text-gray-400" />
          <h3 className="text-xl font-semibold">No Child Added Yet</h3>
          <p className="text-gray-500 max-w-md">
            You haven't added your child to your account yet. Add your child
            to track their learning progress.
          </p>
          <Button
            onClick={() => setAddDialogOpen(true)}
            className="mt-4 cursor-pointer"
          >
            Add Your Child
          </Button>
        </div>
      </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center">
          <h5 className="col-span-2 text-4xl font-bold mb-1 text-gray-900">Welcome, {`${parentInfo?.parent.firstname}`}!</h5>
          <h5 className="col-span-2 text-2xl font-bold mb-4 text-gray-900">Please select your child to continue</h5>

          {createdChild !== null ? (
             <Card key={createdChild._id} onClick={() => handleChildSelect(createdChild._id)} className="bg-[#ADD8E6] flex flex-col items-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-99">
             <CardContent className="p-6">
               <div className="flex items-center space-x-4">
                 <div>
                   <h3 className="text-xl font-semibold text-[#161F6F]">
                     {createdChild.firstname} {createdChild.lastname}
                   </h3>
                   <p className="text-[#3669D5]">Class: {createdChild.class}</p>
                 </div>
               </div>
             </CardContent>
           </Card>
          ) : (
            <div>
               {parentInfo?.children.map((child) => (
              <Card key={child._id} onClick={() => handleChildSelect(child._id)} className="bg-[#ADD8E6] flex flex-col items-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-99">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col justify-center items-center">
                      <h3 className="text-xl font-semibold text-[#161F6F]">
                        {child.firstname} {child.lastname}
                      </h3>
                      <p className="text-[#3669D5]">Class: {child.class}</p>
  
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          )}
        </div>
       
        )}
      

      

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Child</DialogTitle>
            <DialogDescription>
              Enter the details of your child to add them to your account.
            </DialogDescription>
          </DialogHeader>
         <form onSubmit={handleSubmit(handleAddChild)}>
         <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="firstname" className="text-right">
                First Name
              </label>
              <input
                id="firstname"
                {...register("firstname")}
                className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                placeholder="Child's first name"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="lastname" className="text-right">
                Last Name
              </label>
              <input
                id="lastname"
                {...register("lastname")}
                className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                placeholder="Child's last name"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="class" className="text-right">
                Class
              </label>
              <input
                id="class"
                {...register("class")}
                className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                placeholder="Child's class"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Child</Button>
          </DialogFooter>
         </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ChildrenPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChildrenSelection />
    </Suspense>
  );
}

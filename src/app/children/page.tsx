"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChildSignupResponse, ParentInfo } from "@/types/api";
import { format } from "date-fns";
import { Calendar as CalendarIcon, UserPlus } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChildFormSchema } from "@/lib/form-utils";

function ChildrenSelection() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const params = searchParams.get("params");

  const [parentInfo, setParentInfo] = useState<ParentInfo | null>(null);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [hasChild, setHasChild] = useState(false);
  const [createdChild, setCreatedChild] = useState<ChildSignupResponse | null>(
    null
  );

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ChildFormSchema>>({
    resolver: zodResolver(ChildFormSchema),
  });

  async function onSubmit(data: z.infer<typeof ChildFormSchema>) {
    setLoading(true);
    const reqBody = {
      ...data,
      parent_id: parentInfo?.parent.parent_id,
    };

    const response = await fetch("/api/child", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to add child");
    }

    if (result?.error) {
      setError("Cannot create child");
    } else {
      setLoading(false);
      setHasChild(true);
      setAddDialogOpen(false);
      setCreatedChild(result);
    }
  }

  const handleChildSelect = async (childId: string) => {
    setLoading(true);

    const res = await signIn("credentials", {
      userId: childId,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid child ID");
    } else {
      router.push("/dashboard");
      toast("Success");
    }
  };

  useEffect(() => {
    try {
      const data = params ? JSON.parse(params) : null;

      if (data && typeof data === "object") {
        // Check if data has a children array
        if (Array.isArray(data.children)) {
          setParentInfo(data as ParentInfo);
          if (data.children.length !== 0) {
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
    <div className="container mx-auto p-4">
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
        <div>
          <div className="flex items-center justify-between mb-4">
            <h5 className="col-span-2 text-4xl font-bold mb-1 text-gray-900">
              Welcome, {`${parentInfo?.parent.firstname}`}!
            </h5>

            <Button
              onClick={() => router.push("/login")}
              className="cursor-pointer"
              variant="outline"
            >
              Logout
            </Button>
          </div>

          <Alert className="my-4">
            <AlertDescription>
              Please select your child to continue
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parentInfo?.children.map((child) => (
              <Card
                key={child._id}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleChildSelect(child._id)}
                aria-disabled={loading}
              >
                <CardHeader className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{child.firstname?.[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle>
                    {child.firstname} {child.lastname}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-start text-sm gap-3">
                      <span>Class</span>
                      <span>{child.class}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {createdChild !== null && (
            <Card
              key={createdChild._id}
              onClick={() => handleChildSelect(createdChild._id)}
              className="cursor-pointer"
            >
              <CardHeader className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{createdChild.firstname?.[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>
                  {createdChild.firstname} {createdChild.lastname}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-start text-sm gap-3">
                    <span>Class</span>
                    <span>{createdChild.class}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Add New Child</DialogTitle>
                <DialogDescription>
                  Enter the details of your child to add them to your account.
                </DialogDescription>
              </DialogHeader>

              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fist Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <Input placeholder="Class" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your child's age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="cursor-pointer">
                  Add Child
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChildrenSelection;

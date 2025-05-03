"use client";

import Header from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  learningProgress,
  monthlyProgress,
  skillDistribution,
  subjectPerformance,
  timeDistribution,
  weeklyActivity,
} from "@/data/dashboardData";
import { ChildFormSchema } from "@/lib/form-utils";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApexOptions } from "apexcharts";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardPage() {
  const { data: session } = useSession();

  const [isUpdate, setIsUpdate] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Chart options and configurations
  const weeklyActivityOptions: ApexOptions = {
    chart: {
      type: "area" as const,
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    colors: ["#6366f1"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: weeklyActivity.map((item) => item.date),
    },
    yaxis: {
      title: { text: "Minutes" },
    },
  };

  const monthlyProgressOptions: ApexOptions = {
    chart: {
      type: "line" as const,
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    colors: ["#6366f1", "#ec4899", "#f59e0b", "#10b981"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: monthlyProgress.labels,
    },
    yaxis: {
      title: { text: "Progress (%)" },
    },
  };

  const subjectPerformanceOptions: ApexOptions = {
    chart: {
      type: "radar" as const,
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    colors: ["#6366f1"],
    xaxis: {
      categories: subjectPerformance.map((item) => item.subject),
    },
    yaxis: {
      min: 0,
      max: 100,
    },
  };

  const skillDistributionOptions: ApexOptions = {
    chart: {
      type: "bar" as const,
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    colors: ["#6366f1"],
    xaxis: {
      categories: skillDistribution.labels,
    },
    yaxis: {
      title: { text: "Score (%)" },
    },
  };

  const timeDistributionOptions: ApexOptions = {
    chart: {
      type: "donut" as const,
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    colors: ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#6b7280"],
    labels: timeDistribution.labels,
  };

  const defaultValues = useMemo(
    () => ({
      firstname: session?.user.firstname || "",
      lastname: session?.user.lastname || "",
      class: session?.user.class || "",
      dob: session?.user.dob ? new Date(session?.user.dob) : new Date(),
    }),
    [session?.user]
  );

  const form = useForm<z.infer<typeof ChildFormSchema>>({
    resolver: zodResolver(ChildFormSchema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof ChildFormSchema>) {
    const reqBody = {
      ...data,
      id: session?.user.id,
    };
    const response = await fetch("/api/child", {
      method: "PUT",
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
      const res = await signIn("credentials", {
        userId: session?.user.id,
        redirect: false,
      });

      setIsUpdate(false);
    }
  }

  useEffect(() => {
    if (session?.user) {
      form.reset({
        firstname: session.user.firstname,
        lastname: session.user.lastname,
        class: session.user.class,
        dob: new Date(session.user.dob),
      });
    }
  }, [session?.user]);

  return (
    <>
      <div>
        <Header />
        <div className="container mx-auto p-6 pt-24">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, Parent!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's how your children are progressing with their learning
              journey.
            </p>
          </div>

          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="children">Children's Info</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningProgress.map((progress) => (
                  <Card key={progress.subject}>
                    <CardHeader>
                      <CardTitle>{progress.subject}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Progress</span>
                          <span>{progress.completed}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${progress.completed}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Last activity:{" "}
                          {new Date(progress.lastActivity).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Chart
                      options={weeklyActivityOptions}
                      series={[
                        {
                          name: "Activity",
                          data: weeklyActivity.map((item) => item.minutes),
                        },
                      ]}
                      type="area"
                      height={350}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Chart
                      options={monthlyProgressOptions}
                      series={[
                        {
                          name: "Mathematics",
                          data: monthlyProgress.mathematics,
                        },
                        { name: "Science", data: monthlyProgress.science },
                        { name: "English", data: monthlyProgress.english },
                        { name: "History", data: monthlyProgress.history },
                      ]}
                      type="line"
                      height={350}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Chart
                      options={subjectPerformanceOptions}
                      series={[
                        {
                          name: "Score",
                          data: subjectPerformance.map((item) => item.score),
                        },
                      ]}
                      type="radar"
                      height={350}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skill Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Chart
                      options={skillDistributionOptions}
                      series={[{ name: "Score", data: skillDistribution.data }]}
                      type="bar"
                      height={350}
                    />
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Time Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Chart
                      options={timeDistributionOptions}
                      series={timeDistribution.data}
                      type="donut"
                      height={350}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent
              value="children"
              className="space-y-6 grid grid-cols-3 gap-6"
            >
              {session?.user && (
                <Card key={session?.user.id}>
                  <CardHeader className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {session?.user.firstname?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>
                      {session?.user.firstname} {session?.user.lastname}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-start text-sm gap-3">
                        <span>Class</span>
                        <span>{session?.user.class}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-end">
                    <Button
                      className="cursor-pointer"
                      onClick={() => setIsUpdate(true)}
                    >
                      Edit Info
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isUpdate} onOpenChange={setIsUpdate}>
        <DialogContent>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

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
                            {(() => {
                              try {
                                return format(field.value, "PPP");
                              } catch {
                                return <span>Pick a date</span>;
                              }
                            })()}

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
                <Button variant="outline" onClick={() => setIsUpdate(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="cursor-pointer"
                >
                  {form.formState.isSubmitting ? "Updating" : "Update Info"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

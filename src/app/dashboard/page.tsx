"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  children as initialChildren,
  learningProgress,
  weeklyActivity,
  subjectPerformance,
  monthlyProgress,
  skillDistribution,
  timeDistribution,
} from "@/data/dashboardData";
import type { ApexOptions } from "apexcharts";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Child } from "@/data/dashboardData";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [children, setChildren] = useState<Child[]>(initialChildren);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [childToDelete, setChildToDelete] = useState<Child | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

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

  const handleDeleteClick = (child: Child) => {
    setChildToDelete(child);
    setDeleteDialogOpen(true);
  };

  return (
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

          <TabsContent value="children" className="space-y-6">
            {children.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <UserPlus className="h-16 w-16 text-gray-400" />
                  <h3 className="text-xl font-semibold">No Child Added Yet</h3>
                  <p className="text-gray-500 max-w-md">
                    You haven't added your child to your account yet. Add your
                    child to track their learning progress.
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* {children.map((child) => (
                  <Card key={child.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-24 h-24">
                          <Image
                            src={child.profilePicture}
                            alt={child.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">
                            {child.name}
                          </h3>
                          <p className="text-gray-600">Age: {child.age}</p>
                          <p className="text-gray-600">Grade: {child.grade}</p>
                          <p className="text-gray-600">
                            Joined:{" "}
                            {new Date(child.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                          Update Profile
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteClick(child)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))} */}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

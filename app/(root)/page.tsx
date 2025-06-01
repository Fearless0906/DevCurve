"use client";

import CurveCard from "@/components/CurveCard";
import { Button } from "@/components/ui/button";
import { getAllComponents } from "@/data/django/schema";
import { ComponentResponse } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const [components, setComponents] = useState<ComponentResponse[]>([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const data = await getAllComponents();
        setComponents(data);
      } catch (error) {
        console.error("Failed to fetch components:", error);
      }
    };
    fetchComponents();
  }, []);

  // @ts-ignore
  return (
    <main className="wrapper pt-32 pb-8">
      <div className="container">
        <div className="flex items-center justify-between mb-4 gap-2 w-full">
          <h1 className="text-2xl font-bold self-start">Featured Components</h1>

          <Link href={`/create-project`}>
            <Button variant="default">Create Project</Button>
          </Link>
        </div>
        <section className="card-grid mt-4 w-full">
          {components.length ? (
            components.map((project) => (
              <CurveCard key={project.id} {...project} />
            ))
          ) : (
            <p>No components found.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default page;

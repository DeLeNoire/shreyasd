"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CardStuff } from "./card/componentCard";

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface Project {
  id: number;
  name: string;
  images: string[];
  techs: { name: string; description: string }[];
  liveLink?: string;
  githubLink?: string;
  //hooks: Hook[];
}

const Projects = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[] | null>(null);

  // Fetch categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch category details (including projects)
  const handleCategorySelect = async (categoryName: string) => {
    try {
      const response = await fetch(`/api/projects/${categoryName}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const categoryData = await response.json();

      setProjects(categoryData);

      categoryData.projects(0); // Reset project index to 0
    } catch (error) {
      console.error("Failed to fetch category data:", error);
    }
  };

  return (
    <>
      <div className="flex space-x-20 mt-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center justify-center"
          >
            <Button
              variant={"gradient"}
              size={"icon"}
              className="p-5 hover:bg-slate-50"
              onClick={() => {
                handleCategorySelect(category.name);
              }}
            >
              <img src={`/${category.icon}.png`} alt={category.name} />
            </Button>
            <p className="mt-4 text-sm">{category.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 ml-16">
        {projects && <CardStuff projects={projects} />}
      </div>
    </>
  );
};

export default Projects;

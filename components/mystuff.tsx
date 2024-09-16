"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CardStuff } from "./card/componentCard";
import Skeleton from "./card/skeletonCard";

// Interface definitions
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
}

const Projects = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cachedProjects, setCachedProjects] = useState<
    Record<string, Project[]>
  >({});
  const [loading, setLoading] = useState<boolean>(true);

  // GIF display duration in milliseconds (6 seconds)
  const gifDuration = 6000;

  // Fetch categories and preload data
  useEffect(() => {
    const fetchCategoriesAndProjects = async () => {
      try {
        // Parallel fetching of categories and projects
        const categoriesResponse = await fetch("/api/categories");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch all project data in parallel
        const projectPromises = categoriesData.map(
          async (category: Category) => {
            const response = await fetch(`/api/projects/${category.name}`);
            return { category: category.name, data: await response.json() };
          }
        );

        const projectsData = await Promise.all(projectPromises);

        // Cache all fetched projects
        const newCache: Record<string, Project[]> = {};
        projectsData.forEach(({ category, data }) => {
          newCache[category] = data;
        });

        setCachedProjects(newCache);

        // Automatically select the first category
        if (categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0].name);
          setProjects(newCache[categoriesData[0].name]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        // Set a timeout for the loading state based on GIF duration
        setTimeout(() => setLoading(false), gifDuration);
      }
    };

    fetchCategoriesAndProjects();
  }, []);

  // Handle category selection, using preloaded cached data
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (cachedProjects[categoryName]) {
      setProjects(cachedProjects[categoryName]);
    }
  };

  return (
    <>
      <div className="flex space-x-20 mt-6 items-center justify-center">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center justify-center"
          >
            <Button
              variant={"gradient"}
              size={"icon"}
              className={`p-5 hover:bg-slate-50 ${
                selectedCategory === category.name ? "bg-gray-200" : ""
              }`}
              onClick={() => handleCategorySelect(category.name)}
            >
              <img src={`/${category.icon}.png`} alt={category.name} />
            </Button>
            <p className="mt-4 text-sm">{category.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 ml-16">
        {loading ? <Skeleton /> : projects && <CardStuff projects={projects} />}
      </div>
    </>
  );
};

export default Projects;

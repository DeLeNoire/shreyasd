"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CardStuff } from "./card/componentCard";
import Skeleton from "./card/skeletonCard";

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
  const [loading, setLoading] = useState<boolean>(false);

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

        // Automatically fetch the first category's projects
        if (data.length > 0) {
          handleCategorySelect(data[0].name); // Preload first category
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch category details (including projects)
  const handleCategorySelect = async (categoryName: string) => {
    if (cachedProjects[categoryName]) {
      // If already cached, load from cache
      setProjects(cachedProjects[categoryName]);
      return;
    }

    setLoading(true); // Show loading indicator
    try {
      const response = await fetch(`/api/projects/${categoryName}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const categoryData = await response.json();
      setProjects(categoryData);

      // Cache the fetched projects
      setCachedProjects((prevCache) => ({
        ...prevCache,
        [categoryName]: categoryData,
      }));

      setSelectedCategory(categoryName);
    } catch (error) {
      console.error("Failed to fetch category data:", error);
    } finally {
      setLoading(false); // Hide loading indicator
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
        {loading ? (
          <Skeleton /> // You can replace this with a spinner or loading animation
        ) : (
          projects && <CardStuff projects={projects} />
        )}
      </div>
    </>
  );
};

export default Projects;

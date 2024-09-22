import React, { memo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/card/card";
import Image from "next/image";
import { Timeline } from "../ui/timeline";
import { motion } from "framer-motion";

interface Project {
  id: number;
  name: string;
  images: string[];
  techs: { name: string; description: string }[];
  liveLink?: string;
  githubLink?: string;
}

interface CardStuffProps {
  projects: Project[];
}

export const CardStuff: React.FC<CardStuffProps> = ({ projects }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Set up an interval to change the image every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === projects[currentProjectIndex].images.length - 1
          ? 0
          : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [projects, currentProjectIndex]);

  const handleImageError = () => {
    setImageError(true);
  };

  const data = [
    ...projects
      .map((project) =>
        projects[currentProjectIndex].techs.map((tech) => ({
          title: tech.name,
          content: tech.description,
        }))
      )
      .flat(),
  ];

  return (
    <>
      <Card className="w-[70rem] h-[40rem]">
        <CardHeader>
          <CardTitle>
            <div className="space-x-4">
              {projects.map((project, projectIndex) => (
                <Button
                  variant={"gradient"}
                  key={project.id}
                  onClick={() => {
                    setCurrentProjectIndex(projectIndex);
                    setCurrentImageIndex(0); // Reset image index when switching projects
                    setImageError(false); // Reset error state on project change
                  }}
                >
                  {project.name}
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <div className="h-px w-full bg-gradient-to-r from-white via-black to-white"></div>
        <CardContent>
          <div className="-ml-24 mt-4 flex">
            <motion.div
              key={projects[currentProjectIndex]?.id} // Ensure re-render on project change
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "circOut" }}
              className="mt-8 border p-4 rounded-xl  bg-white"
            >
              {projects[currentProjectIndex]?.images?.[currentImageIndex] && !imageError ? (
                <Image
                  src={`/${projects[currentProjectIndex].images[currentImageIndex]}`}
                  alt="project image"
                  height={350}
                  width={650}
                  className="rounded-md"
                  draggable={false}
                  priority
                  quality={85}
                  placeholder="blur"
                  blurDataURL={`/${projects[currentProjectIndex].images[currentImageIndex]}?blur`}
                  onError={handleImageError} // Handle image load errors
                />
              ) : (
                <p className="text-center">Image not available</p> // Fallback in case of missing or broken image
              )}
            </motion.div>

            <div className="h-[30rem] overflow-scroll scrollbar-hide mt-5 ml-16">
              <Timeline data={data} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

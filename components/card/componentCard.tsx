import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/card/card";
import { ContainerScroll } from "../ui/ipad";
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

  useEffect(() => {
    // Set up an interval to change the image every 4 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === projects[currentProjectIndex].images.length - 1
          ? 0
          : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [projects, currentProjectIndex]);

  const data = [
    ...projects
      .map((project) =>
        project.techs.map((tech) => ({
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
                  onClick={() => setCurrentProjectIndex(projectIndex)}
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
            <ContainerScroll>
              <motion.div
                key={projects[currentProjectIndex].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "linear" }}
              >
                <Image
                  src={`/${projects[currentProjectIndex].images[currentImageIndex]}`}
                  alt="project image"
                  height={540}
                  width={1050}
                  className="rounded-md"
                  draggable={false}
                />
              </motion.div>
            </ContainerScroll>
            <div className="h-[30rem] overflow-scroll scrollbar-hide mt-5 ml-16">
              <Timeline data={data} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

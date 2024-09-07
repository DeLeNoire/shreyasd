import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/card/card";
import { ContainerScroll } from "../ui/ipad";

const Skeleton = () => {
  return (
    <>
      <Card className="w-[70rem] h-[40rem] animate-pulse bg-gradient-to-b from-grey-50 to-white rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="space-x-4">
              <Button
                variant={"gradient"}
                className="w-32 h-10 bg-gray-100 rounded-lg animate-pulse"
              ></Button>
            </div>
          </CardTitle>
        </CardHeader>
        <div className="h-px w-full bg-gradient-to-r from-white via-black to-white"></div>
        <CardContent className="animate-none">
          <div className="-ml-24 mt-4 flex">
            <ContainerScroll>
              <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse"></div>
            </ContainerScroll>
            <div className="h-[30rem] overflow-scroll scrollbar-hide mt-5 ml-16">
              <div className="space-y-4">
                <div className="w-[27rem] h-[32rem] bg-gray-100 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Skeleton;

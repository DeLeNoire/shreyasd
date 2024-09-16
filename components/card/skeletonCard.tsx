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
        <CardContent className="animate-none flex items-center justify-center mt-32">
          <img src="/load.gif" alt="Loading" className="w-64 h-64 mx-auto" />
        </CardContent>
      </Card>
    </>
  );
};

export default Skeleton;

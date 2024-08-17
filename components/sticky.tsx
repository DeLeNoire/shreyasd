
import { StickyScroll } from "@/components/ui/stickyScroll";
import { Card, Carousel } from "./ui/carousel";
import DevelopmentData from "@/lib/data/developmentdata";



  const dev = [
    {
      category: "Development",
      title: "Projects",
      src: "/pink.jpg",
      content: <DevelopmentData/>,
    },]

    const devcards = dev.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
      ));



  const cyber = [
    {
      category: "cyber",
      title: "Projects",
      src: "/brain.jpg",
      content: <DevelopmentData/>,
    },]
    
    const cyberCards = cyber.map((card, index) => (
      <Card key={card.src} card={card} index={index} />
    ));

  const cloud = [
      {
        category: "My",
        title: "Projects",
        src: "/cube.jpg",
        content: <DevelopmentData/>,
      },]
      
    const cloudCards = cloud.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
      ));

  const quant = [
        {
          category: "My",
          title: "Projects",
          src: "/circle.jpg",
          content: <DevelopmentData/>,
        },]
        
    const quantCards = quant.map((card, index) => (
          <Card key={card.src} card={card} index={index} />
        ));

  const dsa = [
          {
            category: "My",
            title: "Projects",
            src: "/lamp.jpg",
            content: <DevelopmentData/>,
          },]
          
    const dsaCards = dsa.map((card, index) => (
            <Card key={card.src} card={card} index={index} />
          ));
  
  const ai = [
            {
              category: "My",
              title: "Projects",
              src: "/phone.jpg",
              content: <DevelopmentData/>,
            },]
            
    const aiCards = ai.map((card, index) => (
              <Card key={card.src} card={card} index={index} />
            ));

            
const content = [
  {
    title: "Development",
    description:
      "Leveraging cutting-edge technologies to craft robust solutions. My work spans full-stack development, containerization, and scalable architectures, all designed to optimize performance and drive innovation. Explore detailed insights under specific projects.",
    content: (
        <>
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-black">
        <Carousel items={devcards}/>
      </div>
        </>
    ),
  },
  {
    title: "Cyber Security",
    description:
      "Enhancing security protocols with a focus on performance and resilience. My approach involves optimizing cryptographic operations and fortifying systems against breaches.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Carousel items={cyberCards}/>
      </div>
    ),
  },
  {
    title: "Cloud",
    description:
      "Architecting scalable and resilient cloud solutions with a focus on efficiency. From autoscaling environments to cloud-native applications, my work is geared toward maximizing uptime and performance.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <Carousel items={cloudCards}/>
      </div>
    ),
  },
  {
    title: "Quant",
    description:
      "Applying algorithmic precision to solve complex financial challenges. My projects emphasize accuracy, speed, and innovative techniques in quantitative analysis. For detailed methodologies and results.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Carousel items={quantCards}/>
      </div>
    ),
  },
  {
    title: "Data Structures & Algorithm",
    description:
      "Building efficient and optimized solutions through a deep understanding of data structures and algorithms. My work in DSA is focused on solving complex problems with innovative approaches.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Carousel items={dsaCards}/>
      </div>
    ),
  },
  {
    title: "AI & Miscelaneous",
    description:
      "Creating intelligent systems that learn and adapt. My AI projects involve machine learning, data analytics, and advanced modeling techniques, driving smart decision-making processes.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Carousel items={aiCards}/>
      </div>
    ),
  },
];


export function StickyScrollRevealDemo() {
  return (
    <div className="p-10 w-full py-28">
      <StickyScroll content={content}/>
    </div>
  );
}

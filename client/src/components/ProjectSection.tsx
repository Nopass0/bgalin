import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  url: string;
}

interface ProjectSectionProps {
  projects: Project[];
}

const ProjectSection = ({ projects }: ProjectSectionProps) => {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Мои проекты</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Посмотреть проект
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;

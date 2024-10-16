import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectSection from "@/components/ProjectSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactForm from "@/components/ContactForm";
import { getProjects, getTestimonials } from "@/api";

const Main = () => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, testimonialsData] = await Promise.all([
          getProjects(),
          getTestimonials(),
        ]);
        setProjects(projectsData);
        setTestimonials(testimonialsData);
      } catch (err) {
        setError("Произошла ошибка при загрузке данных");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12"
      >
        <h1 className="text-4xl font-bold mb-4">
          Веб-разработка для вашего бизнеса
        </h1>
        <p className="text-xl mb-8">
          Создаю эффективные и современные веб-решения. Работаю официально как
          ИП, всегда по договору.
        </p>
      </motion.section>

      <ProjectSection projects={projects} />
      <TestimonialSection testimonials={testimonials} />
      <ContactForm />
    </div>
  );
};

export default Main;

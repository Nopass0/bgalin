import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Testimonial {
  id: string;
  author: string;
  text: string;
  projectName: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

const TestimonialSection = ({ testimonials }: TestimonialSectionProps) => {
  return (
    <section className="py-12 bg-[#efe6dd]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Отзывы клиентов</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{testimonial.author}</CardTitle>
                  <CardDescription>{testimonial.projectName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{testimonial.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

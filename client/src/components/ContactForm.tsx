import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { submitContactForm } from "../api";

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Некорректный email адрес"),
  description: z
    .string()
    .min(10, "Описание должно содержать минимум 10 символов"),
  budget: z.string().optional(),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      budget: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await submitContactForm(values);
      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      setSubmitError(
        "Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз."
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <h2 className="text-3xl font-bold mb-8">Оставить заявку</h2>
      {submitSuccess ? (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Спасибо за вашу заявку!</strong>
          <span className="block sm:inline">
            {" "}
            Мы свяжемся с вами в ближайшее время.
          </span>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Ваше имя" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание проекта</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Опишите ваш проект" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Планируемый бюджет (необязательно)</FormLabel>
                  <FormControl>
                    <Input placeholder="Бюджет" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {submitError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Ошибка!</strong>
                <span className="block sm:inline"> {submitError}</span>
              </div>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </Button>
          </form>
        </Form>
      )}
    </motion.section>
  );
};

export default ContactForm;

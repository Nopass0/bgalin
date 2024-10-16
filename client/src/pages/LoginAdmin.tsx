import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { loginAdmin } from "../api";

const formSchema = z.object({
  code: z.string().min(1, "Код обязателен для ввода"),
});

const LoginAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await loginAdmin(values.code);
      localStorage.setItem("adminToken", response.token);
      navigate("/admin");
    } catch (error) {
      setLoginError(
        "Неверный код администратора. Пожалуйста, попробуйте еще раз."
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-md py-12"
    >
      <h1 className="text-3xl font-bold mb-8">Вход в панель администратора</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Код администратора</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Введите код" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {loginError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Ошибка!</strong>
              <span className="block sm:inline"> {loginError}</span>
            </div>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Вход..." : "Войти"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default LoginAdmin;

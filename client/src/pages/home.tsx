import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiRequest } from "@/lib/queryClient";
import { User, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function Home() {
  const [successMessage, setSuccessMessage] = useState<string>("");

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (data: InsertUser) => {
      return await apiRequest("POST", "/api/users", data);
    },
    onSuccess: () => {
      setSuccessMessage("Пользователь успешно создан!");
      form.reset();
      setTimeout(() => setSuccessMessage(""), 5000);
    },
    onError: () => {
      setSuccessMessage("");
    },
  });

  const onSubmit = (data: InsertUser) => {
    setSuccessMessage("");
    createUserMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold">Вход в систему</CardTitle>
          <CardDescription>
            Введите свой логин и пароль для входа
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {successMessage && (
            <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" data-testid="alert-success">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {createUserMutation.isError && (
            <Alert className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800" data-testid="alert-error">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                Произошла ошибка при создании пользователя. Попробуйте снова.
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Логин
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Введите ваш логин"
                        disabled={createUserMutation.isPending}
                        data-testid="input-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Пароль
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Введите ваш пароль"
                        disabled={createUserMutation.isPending}
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={createUserMutation.isPending}
                data-testid="button-submit"
              >
                {createUserMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  "Войти"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

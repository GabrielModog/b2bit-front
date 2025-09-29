import type React from "react";
import { Formik, Form, Field } from 'formik';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth, loginValidationSchema } from "@/features/auth";
import { Card, CardContent } from "@/components/ui/card";
import b2bitLogo from '@/assets/B2Bit-Logo.png';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      toast.success('Logged in!');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to authenticate, check if your email and password is right.');
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full h-[480px] max-w-md shadow-lg">
        <CardContent className="flex flex-col justify-between h-full">
          <div className="text-center mb-8">
            <img
              src={b2bitLogo}
              alt="B2Bit Logo"
              className="mx-auto h-32 w-auto"
            />
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6 h-full flex flex-col justify-between">
                <div className="flex flex-col h-full gap-6">
                  <Field name="email">
                    {({ field }: any) => (
                      <div className="space-y-2">
                        <Label htmlFor="email"><b>E-mail</b></Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="@gmail.com"
                          {...field}
                        />
                        {touched.email && errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field }: any) => (
                      <div className="space-y-2">
                        <Label htmlFor="password"><b>Password</b></Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="************"
                          {...field}
                        />
                        {touched.password && errors.password && (
                          <p className="text-sm text-red-500">{errors.password}</p>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Sign In'}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  )
}

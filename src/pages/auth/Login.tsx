import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { AppHeader } from '@/components/shell/AppHeader';
import { api } from '@/lib/api/client';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const result = await api.auth.login(data.email, data.password);
      toast({ title: 'Success', description: 'Logged in successfully' });
      
      // Navigate based on role
      if (result.user.role === 'PARENT') {
        navigate('/parent');
      } else if (result.user.role === 'TUTOR') {
        navigate('/tutor');
      } else if (result.user.role === 'ADMIN') {
        navigate('/admin/tutors');
      }
      
      window.location.reload(); // Reload to update header
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.message || 'Login failed',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-primary hover:underline font-medium">
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs font-semibold mb-2">Quick Login (Demo):</p>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p>Parent: parent@test.com</p>
              <p>Tutor: tutor@test.com</p>
              <p>Admin: admin@test.com</p>
              <p className="mt-2">Password: any (demo only)</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

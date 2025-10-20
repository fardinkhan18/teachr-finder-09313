import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AppHeader } from '@/components/shell/AppHeader';
import { api } from '@/lib/api/client';
import { useToast } from '@/hooks/use-toast';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['PARENT', 'TUTOR'], { required_error: 'Please select a role' }),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'PARENT' },
  });

  const role = watch('role');

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const result = await api.auth.register(data.email, data.password, data.role);
      toast({ title: 'Success', description: 'Account created successfully' });
      
      // Navigate based on role
      if (result.user.role === 'PARENT') {
        navigate('/parent');
      } else if (result.user.role === 'TUTOR') {
        navigate('/tutor/profile');
      }
      
      window.location.reload();
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.message || 'Registration failed',
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
            <h1 className="text-2xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join Smart Tutor Connect today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>I am a</Label>
              <RadioGroup
                value={role}
                onValueChange={(value) => setValue('role', value as 'PARENT' | 'TUTOR')}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PARENT" id="parent" />
                  <Label htmlFor="parent" className="font-normal cursor-pointer">
                    Parent / অভিভাবক
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TUTOR" id="tutor" />
                  <Label htmlFor="tutor" className="font-normal cursor-pointer">
                    Tutor / টিউটর
                  </Label>
                </div>
              </RadioGroup>
              {errors.role && (
                <p className="text-sm text-destructive mt-1">{errors.role.message}</p>
              )}
            </div>

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
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-primary hover:underline font-medium">
                Login here
              </Link>
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}

'use server';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const supabase = await createSupabaseServerClient();
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Determine user role and redirect to the correct dashboard securely
  const { data: { user } } = await supabase.auth.getUser();
  const role = user?.user_metadata?.role || 'customer';

  revalidatePath('/', 'layout');
  
  if (role === 'admin') {
     return { success: true, redirectUrl: '/admin' };
  } else if (role === 'worker') {
     return { success: true, redirectUrl: '/worker' };
  } else {
     return { success: true, redirectUrl: '/dashboard' };
  }
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;
  const role = formData.get('role') as string || 'customer';

  if (!email || !password || !firstName || !lastName) {
    return { error: 'All fields are required' };
  }

  const supabase = await createSupabaseServerClient();

  // Supabase Signup with Metadata mapped to public.profiles via Database Trigger
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        role: role,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Usually email signups require verification (free tier friendly)
  return { success: true, message: 'Check your email to verify your account.' };
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  
  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string;
  
  if (!email) {
    return { error: 'Email is required' };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, message: 'Password reset instructions sent to your email.' };
}

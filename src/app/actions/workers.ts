'use server';

import { createClient } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// Using the service role key to securely create users via the Admin API
// without logging the active admin session out!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qvhmnecsrdekezdellrh.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // NO hardcoding the service_role key for security reasons. Must be set in .env.local!

export async function registerWorker(formData: FormData) {
  const currentSession = await createSupabaseServerClient();
  const { data: { user } } = await currentSession.auth.getUser();

  // 1. Authorization strict check
  if (!user) {
    return { error: 'You must be logged in to register a worker.' };
  }

  const { data: profile } = await currentSession
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
     return { error: 'Unauthorized. Only administrators can secure workers.' };
  }

  // 2. Extract worker payload
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;
  const phone = formData.get('phone') as string;

  if (!email || !password || !firstName || !lastName || !phone) {
    return { error: 'All fields are strictly required.' };
  }

  // 3. Create the Admin Client
  if (!supabaseServiceKey) {
    return { error: 'SUPABASE_SERVICE_ROLE_KEY is not defined in the environment. Please add it to .env.local' };
  }

  const adminAuthClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  });

  // 4. Mechanically issue the User Creation (Bypasses email confirm)
  const { data: workerData, error: workerError } = await adminAuthClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    phone,
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
      role: 'worker'
    }
  });

  if (workerError) {
    return { error: 'Failed to provision Worker Auth profile: ' + workerError.message };
  }

  // Note: The database trigger `handle_new_user` will automatically detect `role: 'worker'`
  // inside the user_metadata and create both the `profiles` row AND the `worker_profiles` row instantaneously!
  
  // Revalidate the worker route list
  revalidatePath('/admin/workers');

  return { success: true, workerId: workerData.user.id };
}

export async function assignWorkerToBooking(bookingId: string, workerId: string) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  // Verify requester is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') return { error: 'Only admins can assign workers' };

  const { error } = await supabase
    .from('bookings')
    .update({ 
      worker_id: workerId,
      status: 'worker_assigned' 
    })
    .eq('id', bookingId);

  if (error) return { error: error.message };

  revalidatePath('/admin/bookings');
  return { success: true };
}

'use server';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitBooking(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  const neighborhood = formData.get('neighborhood') as string;
  const apartment = formData.get('apartment') as string;
  const street = formData.get('street') as string;
  const date = formData.get('date') as string;
  const time = formData.get('time') as string;
  const serviceId = formData.get('service_id') as string;
  const totalAmount = parseFloat(formData.get('total_amount') as string || '0');
  
  const guestName = formData.get('guest_name') as string;
  const guestPhone = formData.get('guest_phone') as string;
  const guestEmail = formData.get('guest_email') as string;

  if (!neighborhood || !street || !date || !time || !serviceId) {
    return { error: 'Please fill in all required location and schedule fields.' };
  }
  if (!user && (!guestName || !guestPhone)) {
    return { error: 'Guest name and phone number are required to secure your booking.' };
  }

  // 1. Insert Address (Null customer ID if guest)
  const { data: addressData, error: addressError } = await supabase
    .from('addresses')
    .insert({
      customer_id: user?.id || null,
      neighborhood,
      street_address: street,
      apartment_suite: apartment,
    })
    .select('id')
    .single();

  if (addressError) {
    return { error: 'Failed to save address: ' + addressError.message };
  }

  // 2. Insert Booking with Guest Data
  const { data: bookingData, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      customer_id: user?.id || null,
      service_id: serviceId,
      address_id: addressData.id,
      scheduled_date: date,
      scheduled_time: time,
      total_amount: totalAmount,
      status: 'pending',
      guest_name: guestName || null,
      guest_phone: guestPhone || null,
      guest_email: guestEmail || null
    })
    .select('id')
    .single();

  if (bookingError) {
    return { error: 'Failed to create booking: ' + bookingError.message };
  }

  // Revalidate user dashboards 
  revalidatePath('/dashboard');
  revalidatePath('/admin');
  
  return { success: true, bookingId: bookingData.id };
}

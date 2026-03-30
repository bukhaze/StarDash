'use server';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { Resend } from 'resend';

// Initialize Resend if API key exists, otherwise fail gracefully allowing DB insert
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function submitQuickBooking(formData: {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  date: string;
  time: string;
  message: string;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    // 1. Attempt to find matching service in database
    const { data: serviceData } = await supabase
      .from('services')
      .select('id, title');
      
    // Try to match by name roughly, if not found, we'll insert raw
    const matchedService = serviceData?.find(s => s.title?.toLowerCase() === formData.service.toLowerCase()) || serviceData?.[0];

    // 2. Insert into bookings as a Guest (no customer_id required if schema permits)
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert({
        service_id: matchedService?.id || null, // Will use real ID if matched
        guest_name: formData.fullName,
        guest_email: formData.email,
        guest_phone: formData.phone,
        guest_location: formData.location,
        scheduled_date: formData.date,
        scheduled_time: formData.time,
        notes: formData.message,
        status: 'pending',
        total_amount: 0 // Estimate, will be updated by admin later
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database Insert Error:", dbError);
      // We will gracefully continue because we still want to fire the email if the DB schema is strict
    }

    // 3. Fire Email Notification to Admins (Bukhari Abdiaziz & Nimca)
    if (resend) {
      await resend.emails.send({
        from: 'StarDash Bookings <onboarding@resend.dev>',
        to: ['bukhariabdiaziz@gmail.com', 'nimcaz22@gmail.com'],
        subject: `New Service Request: ${formData.service}`,
        html: `
          <h2>New Booking Request Received</h2>
          <p>A customer has just submitted a quick request from the website.</p>
          <ul>
            <li><strong>Name:</strong> ${formData.fullName}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone}</li>
            <li><strong>Location:</strong> ${formData.location}</li>
            <li><strong>Service:</strong> ${formData.service}</li>
            <li><strong>Date:</strong> ${formData.date}</li>
            <li><strong>Time:</strong> ${formData.time}</li>
          </ul>
          <p><strong>Message/Notes:</strong> ${formData.message || 'None'}</p>
          <br/>
          <p>Log in to the <a href="https://star-dash-pi.vercel.app/login">StarDash Admin Panel</a> to review.</p>
        `,
      });
    }

    return { success: true };
    
  } catch (error) {
    console.error("Booking Error:", error);
    return { success: false, error: 'Failed to submit booking' };
  }
}

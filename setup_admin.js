const url = 'https://qvhmnecsrdekezdellrh.supabase.co/auth/v1/admin/users';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2aG1uZWNzcmRla2V6ZGVsbHJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDczOTg3OSwiZXhwIjoyMDkwMzE1ODc5fQ.fZ8zPwhPp7t_pptXl3PtBCs9sTv7CarzAfMkuO7Rzhs';

fetch(url, {
  method: 'POST',
  headers: {
    'apikey': key,
    'Authorization': 'Bearer ' + key,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'bukhariabdiaziz22@gmail.com',
    password: 'StarDashAdmin2026!',
    email_confirm: true,
    user_metadata: { first_name: 'Bukhari', last_name: 'Abdiaziz', role: 'admin' }
  })
})
.then(res => res.json())
.then(async data => {
  console.log('User creation response:', data);
  if (data.id) {
    // Hard-set the role to admin in the Profiles table just to be completely certain
    const updateRes = await fetch('https://qvhmnecsrdekezdellrh.supabase.co/rest/v1/profiles?id=eq.' + data.id, {
        method: 'PATCH',
        headers: {
            'apikey': key,
            'Authorization': 'Bearer ' + key,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ role: 'admin' })
    });
    console.log('Admin Database Security Clearance Set:', updateRes.status === 204 ? 'SUCCESS' : updateRes.statusText);
  }
})
.catch(console.error);

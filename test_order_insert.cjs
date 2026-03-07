const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
    const [key, ...values] = line.split('=');
    if (key && values.length > 0) {
        acc[key.trim()] = values.join('=').trim();
    }
    return acc;
}, {});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testInsert() {
    try {
        const { data, error } = await supabase
            .from('orders')
            .insert({
                user_email: "test@example.com",
                payment_method: "bank",
                total_amount: 100,
                items: [],
                customer_details: { name: "Test User", email: "test@example.com", address: "123 Test St", city: "Testville", zip: "12345", phone: "1234567890" },
                status: 'pending'
            })
            .select()
            .single();

        console.log("DATA:", JSON.stringify(data, null, 2));
        if (error) {
            console.error("ERROR:", JSON.stringify(error, null, 2));
        } else {
            console.log("Success! Inserted row:", data.id);
        }
    } catch (err) {
        console.error("CAUGHT EXCEPTION:", err);
    }
}

testInsert();


const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually load .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    const eqIdx = line.indexOf('=');
    if (eqIdx > -1) {
        const k = line.substring(0, eqIdx).trim();
        const v = line.substring(eqIdx + 1).trim();
        env[k] = v;
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) { console.error('Missing creds'); process.exit(1); }

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
    console.log('Testing INSERT...');
    const testOrder = {
        user_email: 'test@example.com',
        payment_method: 'cod',
        total_amount: 100,
        items: [],
        customer_details: { name: 'Test Script' },
        status: 'pending'
    };

    const { data, error } = await supabase
        .from('orders')
        .insert(testOrder)
        .select()
        .single();

    if (error) {
        console.error('INSERT failed:', error);
    } else {
        console.log('INSERT successful! ID:', data.id);
    }
}

testInsert();

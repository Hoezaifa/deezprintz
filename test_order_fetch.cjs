const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://mlojcunsiuskibtflpcb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sb2pjdW5zaXVza2lidGZscGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzQyMDQsImV4cCI6MjA4NjQxMDIwNH0.-FWsexQTG6BFOMBF67gwvxW9kta-jw5mbSq0yzBAlSk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testFetch() {
    console.log("Fetching orders with Anon Key...");
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("READ ERROR:", JSON.stringify(error, null, 2));
        } else {
            console.log(`Successfully fetched ${data?.length || 0} orders.`);
            if (data?.length > 0) {
                console.log("Sample order:", JSON.stringify(data[0], null, 2));
            }
        }
    } catch (err) {
        console.error("Fetch Exception:", err);
    }
}

testFetch();

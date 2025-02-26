import postgres from 'postgres';


const data = await fetch('https://ukhdtlpmctalswsturcw.supabase.co/rest/v1/countries', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVraGR0bHBtY3RhbHN3c3R1cmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDA1MzEsImV4cCI6MjA1NTk3NjUzMX0.8pBux89WXqO5DzAo_FYD2bAki_rChNMq4tnGqmzipp0'
  }
})
  .then(res => res.json())
  .catch(error => {
    // Handle error
  });

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
  return ({
    message:
    'block'
  });
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}

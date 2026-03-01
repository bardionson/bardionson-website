import { Resend } from 'resend';

// Initialize with an empty string, the actual API key should be provided via .env
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || 'mock_audience_id';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // In a production environment, this adds the user to a Resend Contact Audience
        // See: https://resend.com/docs/api-reference/contacts/create-contact
        // We mock the success if running locally without keys to prevent crashing during demo
        if (process.env.RESEND_API_KEY) {
            const { error } = await resend.contacts.create({
                email: email,
                unsubscribed: false,
                audienceId: AUDIENCE_ID,
            });

            if (error) {
                return new Response(JSON.stringify({ error }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch {
        return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

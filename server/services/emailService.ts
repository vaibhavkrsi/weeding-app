import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface Customer {
    name: string;
    email: string;
}

interface Planner {
    name: string;
    email: string;
    phone?: string;
}

interface AssignmentDetails {
    weddingType: string;
    selectedServices: string[];
}

export async function sendCustomerAssignment(
    customer: Customer,
    planner: Planner,
    details: AssignmentDetails
) {
    try {
        await resend.emails.send({
            from: 'Wedding Planner <noreply@yourapp.com>',
            to: customer.email,
            subject: '🎉 Your Wedding Planner is Assigned!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #E91E63;">Congratulations, ${customer.name}!</h1>
                    <p>We've assigned an experienced wedding planner to help make your special day perfect.</p>
                    
                    <div style="background: #F8F9FA; padding: 20px; border-radius: 12px; margin: 20px 0;">
                        <h2 style="margin-top: 0;">Meet Your Planner</h2>
                        <p><strong>Name:</strong> ${planner.name}</p>
                        <p><strong>Email:</strong> ${planner.email}</p>
                        ${planner.phone ? `<p><strong>Phone:</strong> ${planner.phone}</p>` : ''}
                    </div>

                    <div style="background: #FFF0F5; padding: 20px; border-radius: 12px;">
                        <h3 style="margin-top: 0;">Your Wedding Details</h3>
                        <p><strong>Type:</strong> ${details.weddingType}</p>
                        <p><strong>Services:</strong> ${details.selectedServices.join(', ')}</p>
                    </div>

                    <p style="margin-top: 30px;">Your planner will reach out to you within 24 hours to schedule your first consultation.</p>
                    
                    <p style="color: #666; font-size: 14px; margin-top: 40px;">
                        Best regards,<br/>
                        The Wedding Planner Team
                    </p>
                </div>
            `
        });
        console.log(`✅ Email sent to customer: ${customer.email}`);
    } catch (error) {
        console.error('❌ Failed to send customer email:', error);
        throw error;
    }
}

export async function sendPlannerNewLead(
    planner: Planner,
    customer: Customer,
    details: AssignmentDetails
) {
    try {
        await resend.emails.send({
            from: 'Wedding Planner <noreply@yourapp.com>',
            to: planner.email,
            subject: '🎊 New Lead Assigned to You!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #E91E63;">New Customer Assignment</h1>
                    <p>Hi ${planner.name},</p>
                    <p>You've been assigned a new customer who is planning their wedding!</p>
                    
                    <div style="background: #F8F9FA; padding: 20px; border-radius: 12px; margin: 20px 0;">
                        <h2 style="margin-top: 0;">Customer Details</h2>
                        <p><strong>Name:</strong> ${customer.name}</p>
                        <p><strong>Email:</strong> ${customer.email}</p>
                    </div>

                    <div style="background: #E7F5FF; padding: 20px; border-radius: 12px;">
                        <h3 style="margin-top: 0;">Wedding Requirements</h3>
                        <p><strong>Type:</strong> ${details.weddingType}</p>
                        <p><strong>Services Needed:</strong></p>
                        <ul>
                            ${details.selectedServices.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>

                    <p style="margin-top: 30px;">Please reach out to ${customer.name} within 24 hours to schedule an initial consultation.</p>
                    
                    <p style="color: #666; font-size: 14px; margin-top: 40px;">
                        Good luck!<br/>
                        The Wedding Planner Platform
                    </p>
                </div>
            `
        });
        console.log(`✅ Email sent to planner: ${planner.email}`);
    } catch (error) {
        console.error('❌ Failed to send planner email:', error);
        throw error;
    }
}

import { Router, Request, Response } from 'express';
import { assignPlannerToCustomer } from '../services/plannerMatcher';
import { sendCustomerAssignment, sendPlannerNewLead } from '../services/emailService';
import { query } from '../config/db';

const router = Router();

// POST /api/assignments/request-planner
router.post('/request-planner', async (req: Request, res: Response) => {
    const { customerId, weddingType, selectedServices } = req.body;

    if (!customerId || !weddingType) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Get customer details
        const customerResult = await query(
            'SELECT * FROM users WHERE id = $1',
            [customerId]
        );

        const customer = customerResult.rows[0];
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Assign planner
        const planner = await assignPlannerToCustomer({
            customerId,
            weddingType,
            selectedServices: selectedServices || []
        });

        if (!planner) {
            return res.status(503).json({
                message: 'No planners available at the moment. We will notify you when one becomes available.'
            });
        }

        // Send emails
        const emailDetails = {
            weddingType,
            selectedServices: selectedServices || []
        };

        try {
            await Promise.all([
                sendCustomerAssignment(
                    { name: customer.name, email: customer.email },
                    { name: planner.name, email: planner.email, phone: planner.phone_number },
                    emailDetails
                ),
                sendPlannerNewLead(
                    { name: planner.name, email: planner.email },
                    { name: customer.name, email: customer.email },
                    emailDetails
                )
            ]);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the assignment if email fails
        }

        res.json({
            success: true,
            planner: {
                id: planner.id,
                name: planner.name,
                email: planner.email,
                phone: planner.phone_number
            },
            message: 'Planner assigned successfully! Check your email for details.'
        });

    } catch (error) {
        console.error('Assignment error:', error);
        res.status(500).json({ message: 'Server error during planner assignment' });
    }
});

// GET /api/assignments/:customerId
router.get('/:customerId', async (req: Request, res: Response) => {
    const customerId = req.params.customerId;

    try {
        const result = await query(
            `SELECT
                a.*,
                u.name AS planner_name,
                u.email AS planner_email,
                u.phone_number AS planner_phone
            FROM assignments a
            LEFT JOIN users u ON a.planner_id = u.id
            WHERE a.customer_id = $1
            ORDER BY a.created_at DESC`,
            [parseInt(customerId as string, 10)]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

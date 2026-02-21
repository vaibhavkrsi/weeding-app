import { query } from '../config/db';

interface Planner {
    id: number;
    name: string;
    email: string;
    phone_number?: string;
    status: string;
}

interface MatchRequest {
    customerId: number;
    weddingType: string;
    selectedServices: string[];
}

export async function findAvailablePlanner(): Promise<Planner | null> {
    try {
        // Query for available planners with lowest workload
        const result = await query(`
            SELECT
                u.id,
                u.name,
                u.email,
                u.phone_number,
                u.status,
                COUNT(a.id) AS active_assignments
            FROM users u
            LEFT JOIN assignments a ON u.id = a.planner_id AND a.status = 'Active'
            WHERE u.role = 'Planner' AND u.status = 'Active'
            GROUP BY u.id, u.name, u.email, u.phone_number, u.status
            ORDER BY COUNT(a.id) ASC
            LIMIT 1
        `);

        if (result.rows.length > 0) {
            return result.rows[0];
        }

        return null;
    } catch (error) {
        console.error('Error finding planner:', error);
        throw error;
    }
}

export async function createAssignment(request: MatchRequest, plannerId: number) {
    try {
        const servicesJson = JSON.stringify(request.selectedServices);

        await query(
            `INSERT INTO assignments (customer_id, planner_id, status, wedding_type, selected_services)
             VALUES ($1, $2, 'Active', $3, $4)`,
            [request.customerId, plannerId, request.weddingType, servicesJson]
        );

        console.log(`✅ Assignment created: Customer ${request.customerId} → Planner ${plannerId}`);
    } catch (error) {
        console.error('Error creating assignment:', error);
        throw error;
    }
}

export async function assignPlannerToCustomer(request: MatchRequest): Promise<Planner | null> {
    try {
        const planner = await findAvailablePlanner();

        if (!planner) {
            console.log('No available planners found');
            return null;
        }

        await createAssignment(request, planner.id);

        return planner;
    } catch (error) {
        console.error('Error in planner assignment:', error);
        throw error;
    }
}

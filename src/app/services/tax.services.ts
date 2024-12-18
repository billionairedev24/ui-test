import {CartItem} from "@/types/types";


interface TaxRate {
    state: string;
    rate: number;
    hasLocalTax: boolean;
    localRate?: number;
}

// Mock tax rates by state
const TAX_RATES: Record<string, TaxRate> = {
    'CA': { state: 'California', rate: 0.0725, hasLocalTax: true, localRate: 0.01 },
    'NY': { state: 'New York', rate: 0.04, hasLocalTax: true, localRate: 0.045 },
    'TX': { state: 'Texas', rate: 0.0625, hasLocalTax: true, localRate: 0.02 },
    'FL': { state: 'Florida', rate: 0.06, hasLocalTax: true, localRate: 0.01 },
    'IL': { state: 'Illinois', rate: 0.0625, hasLocalTax: true, localRate: 0.0275 }
};

// Mock product categories with special tax rules
const SPECIAL_TAX_CATEGORIES = {
    'food': 0.5, // 50% of regular tax rate
    'medicine': 0, // tax exempt
    'electronics': 1.2 // 20% additional tax
};

export const taxService = {
    async calculateTax(items: CartItem[], state: string, subtotal: number): Promise<{ tax: number; details: string[] }> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const taxRate = TAX_RATES[state.toUpperCase()] || { state: 'Default', rate: 0.05, hasLocalTax: false };
        const details: string[] = [];
        let totalTax = 0;

        // Calculate base state tax
        const stateTax = subtotal * taxRate.rate;
        totalTax += stateTax;
        details.push(`${taxRate.state} State Tax (${(taxRate.rate * 100).toFixed(2)}%): $${stateTax.toFixed(2)}`);

        // Add local tax if applicable
        if (taxRate.hasLocalTax && taxRate.localRate) {
            const localTax = subtotal * taxRate.localRate;
            totalTax += localTax;
            details.push(`Local Tax (${(taxRate.localRate * 100).toFixed(2)}%): $${localTax.toFixed(2)}`);
        }

        // Apply special category rules
        items.forEach(item => {
            if (item.categoryId && SPECIAL_TAX_CATEGORIES[item.categoryId as keyof typeof SPECIAL_TAX_CATEGORIES]) {
                const categoryMultiplier = SPECIAL_TAX_CATEGORIES[item.categoryId as keyof typeof SPECIAL_TAX_CATEGORIES];
                const itemSubtotal = item.price * item.quantity;
                const categoryTax = (itemSubtotal * taxRate.rate * categoryMultiplier) - (itemSubtotal * taxRate.rate);
                totalTax += categoryTax;

                if (categoryTax !== 0) {
                    details.push(
                        `${item.categoryId} Category Adjustment: ${categoryTax > 0 ? '+' : ''}$${categoryTax.toFixed(2)}`
                    );
                }
            }
        });

        return {
            tax: Number(totalTax.toFixed(2)),
            details
        };
    },

    async getTaxRateForLocation(state: string): Promise<TaxRate> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return TAX_RATES[state.toUpperCase()] || { state: 'Default', rate: 0.05, hasLocalTax: false };
    }
};
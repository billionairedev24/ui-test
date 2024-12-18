import axios from "axios";

export const fetchCustomerData = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_GATEWAY_BASE_URL}/api/v1/customer/me`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch customer data', error);
        return null;
    }
};
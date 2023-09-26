import axios, { AxiosError, AxiosResponse } from "axios"

export class ApiServices {


    static async pendingStatusesAPI<T>(payload): Promise<any> {

        const {password, confirmPassword} = payload
    
        try{
            const response: AxiosResponse<T, any> = await axios.post(payload);
            return response
            
        }catch(error){
            if (axios.isAxiosError(error)) {
                // Axios-specific error
                const axiosError: AxiosError = error;
                if (axiosError.response) {
                    console.error('Server responded with:', axiosError.response.status);
                    console.error('Response data:', axiosError.response.data);
                } else if (axiosError.request) {
                    console.error('Request made, but no response received');
                } else {
                    console.error('Error setting up the request:', axiosError.message);
                }
            } else {
                // Non-Axios error
                console.error('Non-Axios error occurred:', error);
            }
            
            throw error; // Re-throw the er
        }
    }
}
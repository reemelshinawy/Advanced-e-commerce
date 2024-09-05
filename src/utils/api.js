export const fetchOrderHistory = async () => {
    const response = await fetch('http://localhost:5000/api/retrieveData', {
        method: 'GET'
    }); // Replace with your API endpoint
    const data = await response.json();
    console.log(data);

    return data;
};

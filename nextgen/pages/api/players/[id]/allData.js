// removes the response from the client console and sends the data to the server console.

import getAllPlayerDataById from "../getAllPlayerDataById";


export default async function handler(req, res) {
    const { id } = req.query;
    try {
        const data = await getAllPlayerDataById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json("Error fetching OverFast data: ", error);
    }
}
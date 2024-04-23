// test with SpitStorm-1138, CptFlacon-1490, ShankDaHobos-1880

// be sure to make search query replace typical battletag # with a - in the URL or it will not work.

export default async function getAllPlayerDataById(playerId) {
    try {
        const apiUrl = `https://overfast-api.tekrop.fr/players/${playerId}?gamemode=quickplay`; // fetches ALL player Data
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Response did not come back: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        const { username, stats } = data;

        return data;

        // send the fetched data back as the API response
        // res.status(200).json(data);

    } catch (error) {
        console.error("Error fetching OverFast data:", error);
        // send an error response if something goes wrong
        throw error();
    }
}

export default async function getAllHeroData(heroId) {
    try {
        const apiUrl = `https://overfast-api.tekrop.fr/heroes/${heroId}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Response did not come back: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error("Error fetching OverFast data:", error);
        throw error();
    }
}
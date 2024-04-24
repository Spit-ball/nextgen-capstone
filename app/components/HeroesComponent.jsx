import React, { useEffect, useState } from "react";
import getAllHeroData from "../../pages/api/heroes/getAllHeroData";
import "./componentStyles/HeroesComponent.css";
import Image from "next/image";

export default function HeroesComponent({ heroIds }) {
  const [heroesData, setHeroesData] = useState([]);

  useEffect(() => {
    const fetchHeroesData = async () => {
      const data = [];
      for (const id of heroIds) {
        try {
          const heroData = await getAllHeroData(id);
          data.push(heroData);
        } catch (error) {
          console.error("Error fetching hero data:", error);
        }
      }
      setHeroesData(data);
    };

    fetchHeroesData();
  }, [heroIds]);

  if (heroesData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="heroes-title">Heroes</h2>
      <div className="heroes-grid">
        {heroesData.map((hero, index) => (
          <div key={index} className="hero">
            <Image
              src={hero.portrait}
              alt={hero.name}
              className="hero-portrait"
              width={80}
              height={80}
            />
            <h2 className="hero-name">{hero.name}</h2>
            <p className="hero-role">{hero.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

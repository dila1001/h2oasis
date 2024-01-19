import { useEffect, useState } from 'react';
import { Plant, getPlants } from '../api/plantsApi';
import SearchBar from './SearchBar';
import PlantCard from './ui/PlantCard';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { getDaysLeft } from '../utils/date';

const PlantsPage = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const plants = await getPlants();
      setPlants(plants);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const sortedPlants = [...plants].sort((a, b) => {
    const daysLeftA = getDaysLeft(
      a.lastWatered,
      parseInt(a.wateringFrequencyInDays, 10)
    );
    const daysLeftB = getDaysLeft(
      b.lastWatered,
      parseInt(b.wateringFrequencyInDays, 10)
    );

    return daysLeftA - daysLeftB;
  });

  const viewLoadingSkeleton = () => {
    return (
      <div>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className='skeleton w-full h-32 my-6'></div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className='mx-5'>
        <SearchBar />
        {isLoading && viewLoadingSkeleton()}

        {sortedPlants.map((plant) => (
          <Link to={`/plant/${plant.id}`} key={plant.id}>
            <PlantCard
              name={plant.name}
              species={plant.species}
              imageUrl={plant.imageUrl}
              lastWatered={plant.lastWatered}
              waterFrequency={plant.wateringFrequencyInDays}
            />
          </Link>
        ))}

        <div className='my-8'>
          <Link to='/plants/plant-edit'>
            <button className='bg-secondary rounded-full p-4 flex justify-center w-full shadow-md'>
              <FaPlus className='text-white text-2xl' />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PlantsPage;

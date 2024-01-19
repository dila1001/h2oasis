import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NewPlant, Plant, getPlantById, updatePlant } from '../api/plantsApi';
import { FaCalendar, FaDroplet, FaPen } from 'react-icons/fa6';
import { getDaysLeft, getTodaysDate } from '../utils/date';
import toast, { Toaster } from 'react-hot-toast';

const PlantPage = () => {
  const { slug } = useParams();

  const [plant, setPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams(window.location.search);
      const success = query.get('success');
      if (slug) {
        const plant = await getPlantById(parseInt(slug, 10));
        setPlant(plant);
        if (success === 'true') {
          toast.success(`${plant!.name} has been successfully saved`, {
            id: 'save',
          });
        }
      }
    };
    fetchData();
  }, [slug]);

  const waterPlant = async () => {
    const updatedPlantData: NewPlant = {
      name: plant!.name,
      species: plant!.species,
      imageUrl: plant!.imageUrl,
      wateringFrequencyInDays: plant!.wateringFrequencyInDays,
      lastWatered: getTodaysDate(),
      waterAmount: plant!.waterAmount,
    };
    const response = await updatePlant(plant!.id, updatedPlantData);
    toast.success(`${plant?.name} has been successfully watered`);
    setPlant(response);
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            Would you like to water {plant?.name}?
          </h3>
          <p className='py-4'>Press yes to water or no to close</p>
          <div className='modal-action'>
            <form method='dialog' className='w-full flex gap-2 justify-end'>
              <button
                className='btn bg-accent text-white'
                onClick={() => waterPlant()}
              >
                Yes
              </button>
              <button className='btn'>No</button>
            </form>
          </div>
        </div>
      </dialog>
      {plant && (
        <div className='mx-5 my-2 flex-row'>
          <img
            src={plant?.imageUrl}
            alt='Image Description'
            className='object-cover rounded-2xl w-full h-80 shadow-md'
          />
          <div className='p-4 my-4'>
            <div className='flex items-center gap-3'>
              <h2 className='card-title text-3xl mb-1'>{plant?.name}</h2>
              <Link to={`/plants/plant-edit?plant=${plant?.id}`}>
                <FaPen className='text-base-300' />
              </Link>
            </div>

            <p className='text-gray-500'>{plant?.species}</p>
          </div>
          <div className='p-4 my-4 flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <FaDroplet className='text-4xl text-success' />
              <div className='flex flex-col'>
                <p className='text-success font-bold'>{plant?.waterAmount}ml</p>
                <p className='text-gray-500'>amount of water</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <FaCalendar className='text-4xl text-success' />
              <div className='flex flex-col'>
                <p className='text-success font-bold'>
                  water in{' '}
                  {getDaysLeft(
                    plant?.lastWatered,
                    parseInt(plant?.wateringFrequencyInDays, 10)
                  )}{' '}
                  days
                </p>
                <p className='text-gray-500'>
                  remind every {plant?.wateringFrequencyInDays} days
                </p>
              </div>
            </div>
          </div>

          <div className='p-4 my-4'>
            <button
              className='bg-secondary rounded-full p-4 flex justify-center w-full shadow-md'
              onClick={() => document.getElementById('my_modal_1').showModal()}
            >
              <FaDroplet className='text-white text-2xl' />
            </button>
          </div>
          {/* <Link to='/plants'>
        <div className='p-4 my-4 flex items-center gap-2 text-base-300 '>
          <FaArrowAltCircleLeft />
          <span>Back</span>
        </div>
      </Link> */}
        </div>
      )}
    </>
  );
};

export default PlantPage;
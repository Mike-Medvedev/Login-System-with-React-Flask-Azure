import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useState } from 'react';
import LoadingSpinner from './loadingSpinner';
export default function Crud({ operation, text, selectedGuitarId, setData, scrollRef }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async data => {
    switch (operation) {
      case 'CREATE': {
        try {
          setIsLoading(true);
          const response = await fetch('https://flask-login-server.azurewebsites.net/create', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify(data),
          });
          if (response.ok) {
            try {
              const refetch = await fetch('https://flask-login-server.azurewebsites.net/guitars', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
              });
              const result = await refetch.json();
              setData(result.data);
              setTimeout(() => {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
              });
            } catch (error) {
              console.error('error refetching', error);
            }
            setIsLoading(false);
            /*
            OPTIMISTIC UPDATE
            const newArr = Object.values(data);
            newArr.unshift('');
            setData(prev => [...prev, newArr]);
            */
          }
        } catch (error) {
          console.error('Error fetching database with create endpoint', error);
        }

        break;
      }
      case 'READ': {
        setIsLoading(true);
        const read = await fetch('https://flask-login-server.azurewebsites.net/guitars', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        const result = await read.json();
        setData(result.data);
        setIsLoading(false);
        break;
      }
      case 'UPDATE': {
        const update = await fetch(
          `https://flask-login-server.azurewebsites.net/${selectedGuitarId}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify(data),
          },
        );
        const response = await update.json();
        if (response.ok) console.log('Successful update');
        break;
      }
      case 'DELETE': {
        setIsLoading(true);
        try {
          const del = await fetch(`https://flask-login-server.azurewebsites.net/delete`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          if (del.ok) {
            const result = await del.json();
            console.log(result);
            /* Optimistic update */
            setData(prev => prev.slice(0, -1));
          }
        } catch (error) {
          console.error(`Error deleting record`, error);
        }
        setIsLoading(false);
        break;
      }
    }
  };
  return isLoading ? (
    <div className="flex justify-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="flex flex-col">
      <div className="flash-text text-green-600 text-2xl font-bold">{text}</div>
      <div className="flex border-2 border-black rounded-md p-1">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 justify-around w-full p-2">
          <div>
            <Label>Brand: </Label>
            <Input {...register('brand')}></Input>
          </div>
          <div>
            <Label>Model: </Label>
            <Input {...register('model')}></Input>
          </div>
          <div>
            <Label>Color: </Label>
            <Input {...register('color')}></Input>
          </div>
          <div>
            <Label>Year: </Label>
            <Input type="number" {...register('year')}></Input>
          </div>
          <div className="flex flex-col justify-end">
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

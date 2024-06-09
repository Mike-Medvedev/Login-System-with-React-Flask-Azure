import React, { useState, useEffect } from 'react';
import reactLogo from '../../assets/react.svg';
import '../../App.css';
import { Button } from '@/components/ui/button';
import { KeyRound } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [isSubmitted, setisSubmitted] = useState(false);
  const [form, setForm] = useState({});
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   console.table(form);
  // }, [form]);

  async function handleLogin() {
    console.log('yo');
    const response = await fetch('http://localhost:7071/api/Login');
    const result = await response.json();
    console.log(result);
    setData(result);
  }

  function handleInput(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="m-3 flex h-6/12 max-w-fit md:w-5/12 xl:w-4/12 flex-col justify-start rounded border-2 border-gray-500 p-2">
      <div className="mt-5 mb-6 flex justify-center object-contain">
        <img src={reactLogo} className={`h-20 p-2 ${isSubmitted && 'logo'}`} alt="React logo" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-5">
        <div>
          <Label htmlFor="name">Username: </Label>
          <Input type="text" name="username" placeholder="Enter username" onChange={handleInput} />
        </div>
        <div>
          <Label htmlFor="pass">Password: </Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-1 flex-col justify-center mt-10">
          <Button onClick={handleLogin}>
            <KeyRound className="mr-2" /> Login
          </Button>
        </div>
        <div className="text-center">
          data is:
          <table className="flex flex-row">
            {data.map((key, index) => {
              return Object.entries(key).map((value, index2) => {
                return (
                  <tbody key={index2}>
                    <tr>
                      <td>{value[0]}</td>
                    </tr>
                    <tr>
                      <td>{value[1]}</td>
                    </tr>
                  </tbody>
                );
              });
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

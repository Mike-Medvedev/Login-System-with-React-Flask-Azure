import { useState, useEffect } from 'react';
import reactLogo from '../../assets/react.svg';
import '../../App.css';
import { Button } from '@/components/ui/button';
import { KeyRound } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export default function Login() {
  const [isSubmitted, setisSubmitted] = useState(false);
  const [serverResponse, setServerResponse] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [data, setData] = useState('');

  useEffect(() => {
    (async function () {
      const { message } = await (await fetch(`/api/Login`)).json();
      console.log(message);
      setData(message);
    })();
  }, []);

  async function handleLogin() {
    setisSubmitted(true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    };
    try {
      const response = await fetch('http://localhost:3000/post', options);
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const responseData = await response.text();
      setServerResponse(responseData);
    } catch (error) {
      console.error('Fetch Error: ', error);
      setServerResponse('An error occurred during login.');
    } finally {
      setisSubmitted(false);
    }
  }

  return (
    <div className="m-3 flex h-3/6 w-3/12 flex-col justify-start gap-10 rounded border-2 border-gray-500 p-2">
      <div className="mb-10 mt-5 flex justify-center object-contain">
        <img src={reactLogo} className={`h-20 p-2 ${isSubmitted && 'logo'}`} alt="React logo" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-5">
        <div>
          <Label htmlFor="name">Username: </Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter username"
            value={userName}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="pass">Password: </Label>
          <Input
            type="password"
            name="pass"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <Button onClick={handleLogin}>
            <KeyRound className="mr-2" /> Login
          </Button>
        </div>
        <div>The data is: {data}</div>
        <Button
          id="list"
          onClick={async () => {
            const endpoint = '/data-api/rest/Person';
            const response = await fetch(endpoint);
            const data = await response.json();
            console.table(data.value);
          }}>
          List
        </Button>
      </div>
    </div>
  );
}

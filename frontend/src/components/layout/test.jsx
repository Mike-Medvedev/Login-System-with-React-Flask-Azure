import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { validTypes } from '@/shared/validTypes';
import { Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useParams } from 'react-router-dom';

export default function Test() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState('');
  const [errorHtml, setErrorHtml] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [contentType, setContentType] = useState('application/json');
  const [search, setSearch] = useState('');
  const [isMatch, setIsMatch] = useState(true);
  const [displayText, setDisplayText] = useState(0);
  const [textStrings, setTextStrings] = useState([]);
  let { userId } = useParams();

  const { toast, dismiss } = useToast();

  // useEffect(() => {
  //   switch (displayText) {
  //     case 0:
  //       setTextStrings(validTypes['Type text']);
  //       break;
  //     case 1:
  //       setTextStrings(validTypes['Type application']);
  //       console.log(validTypes['Type application'].filter((string, index) => index));
  //       break;
  //     case 2:
  //       setTextStrings(validTypes['Type image']);
  //       break;
  //     case 3:
  //       setTextStrings(validTypes['Type audio']);
  //       break;
  //     case 4:
  //       setTextStrings(validTypes['Type video']);
  //       break;
  //     case 5:
  //       setTextStrings(validTypes['Type multipart']);
  //       break;
  //     case 6:
  //       setTextStrings(validTypes['Type vnd']);
  //       break;
  //     default:
  //       setTextStrings([]);
  //       break;
  //   }
  // }, [displayText]);

  // function matchType(input) {
  //   setIsMatch(false);
  //   console.log('running', isMatch);
  //   const matchFound = Object.keys(validTypes).some(key => {
  //     const array = validTypes[key];
  //     return array.includes(input);
  //   });

  //   if (matchFound) {
  //     setIsMatch(true);
  //     console.log(input, 'match found');
  //     return true;
  //   } else {
  //     console.log(input, 'no match found');
  //     return false;
  //   }
  // }

  async function handleFlask() {
    try {
      const response = await fetch('http://127.0.0.1:5000/', {});
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  // async function handleLogin(data) {
  //   setData(data);
  //   const headers = new Headers();
  //   headers.append('content-type', contentType);

  //   const response = await fetch('http://localhost:5000/post', {
  //     method: 'POST',
  //     body: JSON.stringify({ data: data }),
  //     headers: headers,
  //   });

  //   const responseBody = await response.json();
  //   setContentType(response.headers.get('content-type'));
  //   setServerResponse(responseBody);
  //   if (response.status >= 400 && response.status <= 499) {
  //     console.log(responseBody);
  //     setErrorHtml(responseBody);
  //     toast({
  //       variant: 'destructive',
  //       title: response.statusText,
  //       description: 'Error Toast',
  //     });
  //     setTimeout(dismiss, 3000);
  //     console.log('Response ok is: ', response.ok);
  //   } else {
  //     setErrorHtml('');
  //     toast({
  //       variant: 'success',
  //       title: response.statusText,
  //       description: 'Success Toast',
  //     });
  //     console.log('Response ok is: ', response.ok);
  //     setTimeout(dismiss, 3000);
  //   }
  // }

  return (
    <div>
      <Button onClick={() => handleFlask()}>Get From Flask</Button>
      <div>{JSON.stringify(data)}</div>
      <div>The user id is: {userId}</div>
    </div>
  );
}

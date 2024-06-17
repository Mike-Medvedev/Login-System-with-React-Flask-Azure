import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <>
      <div>Hello</div>
      <Link to={'/'}>
        <Button>Logout</Button>
      </Link>
    </>
  );
}

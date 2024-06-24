import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
export default function FormSubmission() {
  const changesToSubmit = useSelector(store => store.dataTable.changesToSubmit);
  console.log(changesToSubmit);

  async function submitFormData() {
    try {
      const update = await fetch(`https://proud-wave-0105b8f0f.5.azurestaticapps.net/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(changesToSubmit),
      });
      const response = await update.json();
      if (update.ok) {
        console.log('Successful update');
      } else {
        throw new Error(response.status);
      }
    } catch (e) {
      console.error('Error submitting form data: ', e.message);
    }
  }

  return (
    <div className="border-2 border-black p-3">
      <Button onClick={submitFormData}>Submit</Button>
    </div>
  );
}

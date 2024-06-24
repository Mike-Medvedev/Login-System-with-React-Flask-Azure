import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ColorRing } from 'react-loader-spinner';
import { setDataSource, resetChanges } from '@/state/slices/dataTableSlice';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Send, ArchiveX } from 'lucide-react';
export default function FormSubmission() {
  const [isLoading, setIsLoading] = useState(null);
  const changesToSubmit = useSelector(store => store.dataTable.changesToSubmit);
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(changesToSubmit);
  }, [changesToSubmit]);

  async function refetch() {
    try {
      const guitars = await fetch('https://flask-login-server.azurewebsites.net/guitars', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      const result = await guitars.json();
      if (guitars.ok) {
        dispatch(setDataSource(result.data));
      } else {
        throw new Error('Failed to fetch guitars');
      }
    } catch (error) {
      console.error('Error refetching guitars: ', error);
      toast({
        className: cn('top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'),
        variant: 'destructive',
        description: 'Error refetching guitars!',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function submitFormData() {
    console.log(changesToSubmit);
    try {
      setIsLoading(true);
      const update = await fetch(`https://flask-login-server.azurewebsites.net/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(changesToSubmit),
      });
      const response = await update.json();
      if (update.ok) {
        dispatch(resetChanges());
        toast({
          className: cn('top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'),
          variant: 'success',
          description: 'Success Submitting!',
        });
        refetch();
      } else {
        throw new Error(response.message || 'Failed to update');
      }
    } catch (e) {
      dispatch(resetChanges());
      toast({
        className: cn('top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'),
        variant: 'destructive',
        description: 'Error Submitting!',
      });
      console.error('Error submitting form data: ', e.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="border-2 border-black flex place-items-center p-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Submit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Changes?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently add/remove data from our
                servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={submitFormData} className="bg-green-600 flex gap-2">
                  <Send />
                  Yes
                </Button>
              </DialogClose>

              <DialogClose asChild>
                <Button className="bg-red-600 flex gap-2">
                  <ArchiveX />
                  No
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {isLoading ? (
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        ) : null}
      </div>
    </>
  );
}

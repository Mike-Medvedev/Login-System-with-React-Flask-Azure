import { Audio } from 'react-loader-spinner';

export default function LoadingSpinner() {
  return (
    <div>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
}

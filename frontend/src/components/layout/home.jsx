import { useLoaderData } from 'react-router-dom';
import { useRef, useState } from 'react';
import Crud from './crud';
import DataTable from './data-table';
import Welcome from './welcome';

/**
 * @description JWT Protected route, user lands here after login
 * Parent component to Welcome and DataTable components
 */
export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full h-full p-3 gap-2 bg-slate-200">
        <Welcome />
        <div className="h-2/3">
          <DataTable />
        </div>
      </div>
    </>
  );
}

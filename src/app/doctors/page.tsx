import prisma from '../../../prisma/lib/prisma';
import DoctorsPage from './DoctorsPage';
import { Doctor } from './types';

const fetchDoctors = async (): Promise<Doctor[]> => {
  return await prisma.doctor.findMany();
};

const Page = async () => {
  const doctors = await fetchDoctors();

  return <DoctorsPage doctors={doctors} />;
};

export default Page;

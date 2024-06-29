import prisma from '../../../../prisma/lib/prisma';
import Payment from './Payments';
// import SchedulePage from './SchedulePage';
import { Doctor } from './types';

const fetchDoctor = async (id: number): Promise<Doctor | null> => {
  return await prisma.doctor.findUnique({ where: { id } });
};

const Page = async ({ params }: { params: { id: string } }) => {
  const doctor = await fetchDoctor(Number(params.id));

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

//   return <SchedulePage doctor={doctor} />;
return <Payment/>;
};

export default Page;

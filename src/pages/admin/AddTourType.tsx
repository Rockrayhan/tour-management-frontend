import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTourTypeModal } from "@/components/modules/tour/AddTourTypeModal";
import { UpdateTourTypeModal } from "@/components/modules/tour/UpdateTourTypeModal";


const AddTourType = () => {
  const { data } = useGetTourTypeQuery(undefined);
  console.log(data);
  

  return (
    <div>

   <AddTourTypeModal/>


      <div className="max-w-4xl mx-auto mt-8 border-1 border-slate-400">
      <h1 className="text-center py-4"> All Tour Types {data?.data?.length} </h1>
        <Table>
          <TableHeader className="bg-slate-800">
            <TableRow>
              <TableHead>Tour Type Name</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="px-4">
            {data?.data?.map((item: { name: string; _id: string }) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium w-full">
                  {item.name}
                </TableCell>
                <TableCell className="flex gap-3">
                    <Button className="bg-red-500"> <Trash2 /> </Button>
                    <UpdateTourTypeModal id={item._id} currentName={item.name}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddTourType;

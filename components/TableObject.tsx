import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DownloadButton } from "./Download";

type response = {
    audioName: string
    audioUrl: string
}

function TableObject({audioName, audioUrl}: response) {
    return ( 
        <div className="flex flex-col items-center bg-amber-500/80 w-full py-4">

            <div className="w-full max-w-4xl overflow-x-auto">
            <Table className="min-w-[600px]">
                <TableCaption>Text to speech audio</TableCaption>
                <TableHeader className="bg-amber-600 ">
                    <TableRow>
                    <TableHead className="w-[150px]">Audio</TableHead>
                    <TableHead>Options</TableHead>
                    <TableHead>Download</TableHead>
                   
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">{audioName}</TableCell>
                    <TableCell>{audioUrl ? <audio controls src={audioUrl}></audio> : "No audio generated yet"} </TableCell>
                    <TableCell className="flex flex-row items-center justify-center">{audioUrl ? <DownloadButton src={audioUrl} filename="speechText" /> : "No audio generated yet"} </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </div>

        </div>
     );
}

export default TableObject;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { downloadExcel, getParticipants } from "@/utils/excelUtils";
import { Download, Search, UserX } from "lucide-react";

export default function AdminDashboard() {
  const [participants, setParticipants] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load participants data
    const loadParticipants = () => {
      try {
        const data = getParticipants();
        setParticipants(data);
      } catch (error) {
        console.error("Error loading participants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadParticipants();
  }, []);

  // Filter participants based on search term
  const filteredParticipants = participants.filter((participant) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      participant.name?.toLowerCase().includes(searchLower) ||
      participant.email?.toLowerCase().includes(searchLower) ||
      participant.university?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search participants..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={downloadExcel}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Download className="mr-2 h-4 w-4" /> Download Excel
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="spinner h-8 w-8 mx-auto mb-4 border-4 border-t-violet-600 border-gray-200 rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading participants...</p>
        </div>
      ) : participants.length === 0 ? (
        <div className="text-center py-12 border rounded-lg border-dashed border-gray-300 bg-gray-50">
          <UserX className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No participants yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Participants will appear here when they register for the hackathon.
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Major</TableHead>
                  <TableHead>Team Status</TableHead>
                  <TableHead>Registration Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">{participant.name}</TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>{participant.university}</TableCell>
                    <TableCell>{participant.major}</TableCell>
                    <TableCell>
                      {participant.teamStatus === "looking"
                        ? "Looking for team"
                        : participant.teamStatus === "have_team"
                        ? "Has team"
                        : "Going solo"}
                    </TableCell>
                    <TableCell>
                      {new Date(participant.registrationDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        {filteredParticipants.length} participant(s) found
      </div>
    </div>
  );
}

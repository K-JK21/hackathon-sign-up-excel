
import * as XLSX from 'xlsx';

// In-memory storage for participants (in a real app, this would be a database)
let participants: any[] = [];

// Function to save a participant
export const saveParticipant = async (data: any) => {
  // Generate a unique ID for the participant
  const participant = {
    id: Date.now().toString(),
    registrationDate: new Date().toISOString(),
    ...data
  };
  
  // Add to our in-memory array
  participants.push(participant);
  
  // Simulate a network delay (in real app, this would be a database write)
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real application, you might save to localStorage, IndexedDB, or a backend server
  try {
    localStorage.setItem('hackathon_participants', JSON.stringify(participants));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
  
  return participant;
};

// Function to get all participants
export const getParticipants = () => {
  // Try to load from localStorage first
  try {
    const stored = localStorage.getItem('hackathon_participants');
    if (stored) {
      participants = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading from localStorage:', e);
  }
  
  return participants;
};

// Function to download participants as Excel file
export const downloadExcel = () => {
  const participantData = getParticipants();
  
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Convert JSON data to worksheet
  const ws = XLSX.utils.json_to_sheet(participantData);
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Participants');
  
  // Generate Excel file and trigger download
  XLSX.writeFile(wb, 'Hackathon_Participants.xlsx');
};

// Initialize by loading any existing data
export const initParticipants = () => {
  try {
    const stored = localStorage.getItem('hackathon_participants');
    if (stored) {
      participants = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading participants from localStorage:', e);
  }
};

// Call initialization immediately
initParticipants();

import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToCSV = (tasks) => {
  const worksheet = utils.json_to_sheet(tasks);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Tasks');
  writeFile(workbook, 'tasks.csv');
};

export const exportToExcel = (tasks) => {
  const worksheet = utils.json_to_sheet(tasks);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Tasks');
  writeFile(workbook, 'tasks.xlsx');
};

export const exportToPDF = (tasks) => {
  const doc = new jsPDF();
  const columns = ['Name', 'Description', 'Category', 'Due Date', 'Status'];
  const rows = tasks.map(t => [
    t.name,
    t.description,
    t.category,
    new Date(t.dueDate).toLocaleDateString(),
    t.status,
  ]);
  doc.autoTable({
    head: [columns],
    body: rows,
  });
  doc.save('tasks.pdf');
};
